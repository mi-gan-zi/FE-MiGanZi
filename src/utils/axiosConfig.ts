import axios, { AxiosInstance } from "axios";
import { LocalTokenRepository } from "repository/LocalTokenRepository";
const locakTokenRepo = new LocalTokenRepository();

export const reissueToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}user/reissue`,
      {},
      {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("refresh-token"),
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    throw new Error("토큰 발급에 실패했습니다.");
  }
};

const createAxiosInstance = (): AxiosInstance => {
  const token = localStorage.getItem("token");
  const instance = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // try {
      //   const newToken = await reissueToken();
      //   config.headers.Authorization = `Bearer ${newToken}`;
      // } catch (error) {
      //   throw new Error("토큰 발급에 실패했습니다.");
      // }
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        try {
          const response = await reissueToken();
          localStorage.removeItem("token");
          localStorage.removeItem("nickname");
          localStorage.setItem("token", response.data.data.accessToken);
          localStorage.setItem("nickname", response.data.data.nickname);
          error.config.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
          return axios.request(error.config);
        } catch (reissueError) {
          throw new Error("토큰 발급에 실패했습니다.");
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;
