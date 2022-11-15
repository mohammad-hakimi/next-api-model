import {
    QueryKey,
    useMutation,
    UseMutationOptions,
    useQuery,
    UseQueryOptions,
    UseQueryResult
} from "react-query";
import {queryClient} from "../../pages/_app";

export const useMutate = <T extends any = unknown,
    R = unknown,
    TError extends { response: { data: any; status: number } } = {
        response: { data: any; status: number };
    },
    TSnapshot = unknown>(
    fetcher: ((args: T) => Promise<R>) | undefined,
    successMessage: string | false = "Information updated successfully.",
    config?: UseMutationOptions<R, TError, T, TSnapshot>
) => {
    const errorHandler = useErrorHandler();
    const {...mutateOptions} = useMutation(
        fetcher ? (args: T) => fetcher(args) : () => "" as any,
        {
            ...config,
            onError(err) {
                errorHandler(err);
            },
            onSuccess(res, vars, ctx) {
                config?.onSuccess?.(res, vars, ctx);
                if (successMessage !== false) {
                    // maybe make a toast or something else
                }
            }
        }
    );

    return {
        ...mutateOptions
    };
};

export const refetchQueries = (fns: Function | Function[]) => {
    if (!Array.isArray(fns)) {
        //@ts-ignore
        queryClient.refetchQueries(fns.toString(), {active: true});
    } else {
        fns.forEach((fn) => {
            queryClient.refetchQueries(fn.toString(), {active: true});
        });
    }
};
export const useGet = <T extends any[], R>(
    fetcher: (...args: T) => Promise<R>,
    config?: UseQueryOptions<R, { response: { data: any; status: number } }>,
    ...args: Parameters<typeof fetcher>
): UseQueryResult<R> => {
    const errorHandler = useErrorHandler();
    return {
        ...useQuery(
            [
                fetcher.toString(),
                typeof args === "string" ? args : args?.[0]
            ] as QueryKey,
            () => fetcher(...args),
            {
                onError(err: { response: { data: any; status: number } }) {
                    errorHandler(err);
                },
                ...config
            }
        )
    };
};

export const useErrorHandler = () => {
    return (err: { response?: { data: any; status: number } }) => {
        let message = "";
        let duration = 3000;
        let type: "warning" | "danger" | "success" = "danger";
        switch (err.response?.status) {
            case 401:
                message =
                    "Unauthorized user! You will be logged out in 3 seconds. " +
                    "Please login again.";
                setTimeout(() => {
                    // logout() -> To clear the cookies and login data from browser and force user to login again
                }, 3000);
                break;
            case 400:
                if (Array.isArray(err.response.data)) {
                    message = err.response.data[0];
                } else if (typeof err.response.data === "object") {
                    const errors = Object.values(err.response.data);
                    const fields = Object.keys(err.response.data);
                    message =
                        (Array.isArray(errors[0])
                            ? `${fields?.[0] !== "__all__" ? fields?.[0] : "Error"}: ${
                                errors[0][0]
                            }`
                            : (errors[0] as any)?.toString()) ?? "Something went wrong!";
                } else if (typeof err.response.data === "string") {
                    message = err.response.data;
                }
                break;
            case 412:
                if (typeof err.response.data === "string") {
                    message = err.response.data;
                }
                break;
            default:
                message = err.response?.data ?? "Something went wrong!";
                break;
        }
        // showToast({duration, message, type});
    };
};
