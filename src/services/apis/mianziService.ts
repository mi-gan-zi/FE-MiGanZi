import { AxiosClient } from "services/axiosClient/axios";
import { localTokenRepoInstance } from "repository/LocalTokenRepository";

// interface
// 1. baseURL
// 2. refresh_token
// 3. access_token
const axiosClient = new AxiosClient(process.env.REACT_APP_ENDPOINT, "");

// interface
// 1. url
// 2. data ?
// 3. option? ( header{ Authorization}, params, timeout)
/**
 * Board API
 */
export const getDetail = async (id: string) => {
  try {
    const url = `user/board/${id}`;
    const response = await axiosClient.axios(url);
    return response;
  } catch (error) {
    throw new Error(`GET Board Error: ${error}`);
  }
};

export const postBoard = async (data: {}) => {
  try {
    const url = `user/board/post/write`;
    const headers = {
      Authorization: "Bearer " + localTokenRepoInstance.getAccess(),
      "Content-Type": "multipart/form-data",
      processData: false,
    };

    const response = await axiosClient.post(url, data, { headers });
    return response;
  } catch (error) {
    throw new Error(`POST Board Error: ${error}`);
  }
};

/**
 * User API
 */
export const postLogout = async () => {
  try {
    const url = `user/logout`;
    const access_token = localTokenRepoInstance.getAccess();
    console.log(access_token);
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    const response = await axiosClient
      .post(url, headers)
      .then(() => localTokenRepoInstance.remove());
    console.log(response);
  } catch (error) {
    throw new Error(`POST Logout Error: ${error}`);
  }
};

export const postReIssue = async (data: any) => {
  try {
    const url = `user/reissue`;
    const headers = {
      Authorization: `Bearer ${data}`,
    };
    const response = await axiosClient.post(url, headers);
    //TODO: response에서 어떻게 값이 들어오는지 확인 불가 스웨거에서도 확인불가 토요일에 확인하기
    // .then((newToken) => localTokenRepoInstance.setRefresh());
    console.log(response);
  } catch (error) {
    throw new Error(`POST REISSUE Error[토큰 발급 실패]: ${error}`);
  }
};
