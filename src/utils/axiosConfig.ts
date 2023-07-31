import axios, { AxiosInstance } from "axios";

export const reissueToken = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}user/reissue`,
      {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("refresh_token"),
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("토큰 발급에 실패했습니다.");
  }
};

const createAxiosInstance = (): AxiosInstance => {
  const token = localStorage.getItem("access_token");
  const instance = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("access_token");
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
          localStorage.removeItem("access_token");
          localStorage.removeItem("nickname");
          localStorage.setItem("access_token", response.data.data.accessToken);
          localStorage.setItem("nickname", response.data.data.nickname);
          error.config.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
          return axios.request(error.config);
        } catch (reissueError) {
          // console.log(reissueError);
          throw new Error("토큰 발급에 실패했습니다.");
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;
