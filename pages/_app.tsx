import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {QueryClient} from 'react-query/types/core';
import {useGet} from "../services/hooks/useQuery";
import {Camera} from "../services/api/cameras/models";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retryOnMount: false,
            refetchOnWindowFocus: false,
            retry: false
        }
    }
});
export default function App({Component, pageProps}: AppProps) {

    // To get user cameras we can use the static method for getting user cameras
    const {data: userCameras} = useGet(Camera.getUserCameraList)

    function modifyOrDelete(camera: Camera) {
        // We can use a model instance to modify or delete

        // Deletion
        camera.delete().then(res => {
            // Do something
        })

        // Modification
        camera.fields.name = "Some new name"
        camera.fields.ip = "Some new ip"
        camera.fields.description = "Some new description"
        camera.fields.frame_rate = 20
        camera.save().then(res => {
            // Do something
        })
        // Note: Be aware the camera instance should be created by the data which is gotten from the server to avoid
        // unwanted modifications.

    }


    return <Component {...pageProps} />
}
