import axios, { AxiosInstance } from "axios";

//
const reissueToken = async () => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/user/reissue`, {
    });
    console.log(response)
    const newToken = response.data.token; 
    return newToken;
  } catch (error) {
    throw new Error("토큰 발급에 실패했습니다.");
  }
};

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
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

  return instance;
};

export default createAxiosInstance;
