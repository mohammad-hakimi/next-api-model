import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export default class Api {
  readonly url: string;
  readonly headers?: { [key: string]: string };
  readonly config?: AxiosRequestConfig | undefined;
  constructor(
    url: string,
    headers?: { [key: string]: string },
    config?: AxiosRequestConfig | undefined
  ) {
    this.url = url;
    this.headers = headers;
    this.config = config;
  }
  async get<T extends any = any>(
    url: string,
    query?: { [key: string]: string } | null,
    config?: AxiosRequestConfig | null,
  ): Promise<AxiosResponse<T>> {
    const queryString = query
      ? `?${Object.keys(query)
          .map((key) => `${key}=${query[key]}`)
          .join("&")}`
      : undefined;
    return await axios.get(this.url + url + (queryString ? queryString : ""), {
      ...this.config,
      ...config,
      headers: {
        ...this.headers,
      }
    });
  }

  async post<T extends any = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<T>> {
    return await axios.post(this.url + url, data, {
      ...this.config,
      ...config,
      headers: {
        ...this.headers,
        ...config?.headers,
      }
    });
  }
  async put<T extends any = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<T>> {
    return await axios.put(this.url + url, data, {
      ...this.config,
      ...config,
      headers: {
        ...this.headers,
        ...config?.headers
      }
    });
  }
  async delete<T extends any = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined,
  ): Promise<AxiosResponse<T>> {
    return await axios.delete(this.url + url, {
      ...this.config,
      headers: {
        ...this.headers,
      },
      ...config
    });
  }
}
