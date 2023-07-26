import { AxiosClient } from "services/axiosClient/axios";
const axiosClient = new AxiosClient(process.env.REACT_APP_ENDPOINT);

export const getBoard = async (id: string) => {
  try {
    const url = `user/board/${id}`;
    const response = await axiosClient.axios(url);
    return response.data;
  } catch (error) {
    throw new Error(`GET Board Error: ${error}`);
  }
};
