import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

export class AxiosClient {
  get(url: string) {
    throw new Error("Method not implemented.");
  }
  private baseURL?: string;
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string | undefined) {
    this.baseURL = baseURL;

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });

    this.axiosInstance.interceptors.request.use(
      (config: AdaptAxiosRequestConfig) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async axios<T>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    const response: AxiosResponse<T> = await this.axiosInstance(url, {
      ...options,
      headers: {
        ...options.headers,
      },
    });
    return response;
  }
}
