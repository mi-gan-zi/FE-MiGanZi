import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

export class AxioisClient {
  private baseURL: string;
  private tokenRepository: any;
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, tokenRepository: any) {
    this.baseURL = baseURL;
    this.tokenRepository = tokenRepository;

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });

    this.axiosInstance.interceptors.request.use(
      (config: AdaptAxiosRequestConfig) => {
        config.headers.Authorization = "Bearer " + this.tokenRepository.get();
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
  }

  async axios(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<any>> {
    const response: AxiosResponse<any> = await this.axiosInstance(url, {
      ...options,
      headers: {
        ...options.headers,
      },
    });
    return response;
  }
}
