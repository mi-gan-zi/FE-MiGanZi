import axios, { AxiosInstance } from "axios";

const reissueToken = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}user/reissue`, {
    },{headers:{
      Authorization: `Bearer`+localStorage.getItem("refreshToken")
    }});
    console.log(response)
    const newToken = response.data.token; 
    return newToken;
  } catch (error) {
    throw new Error("토큰 발급에 실패했습니다.");
  }
};

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    },
  });

  instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      try {
        const newToken = await reissueToken();
        config.headers.Authorization = `Bearer ${newToken}`;
      } catch (error) {
        throw new Error("토큰 발급에 실패했습니다.");
      }
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
          const newToken = await reissueToken();
          localStorage.removeItem("token");
          localStorage.setItem("token", newToken)
          error.config.headers.Authorization = `Bearer ${newToken}`;
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
