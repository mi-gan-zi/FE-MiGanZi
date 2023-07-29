import { AxiosClient } from "services/axiosClient/axios";
import { localTokenRepoInstance } from "repository/LocalTokenRepository";

// interface
// 1. baseURL
// 2. refresh_token
// 3. access_token
const axiosClient = new AxiosClient(process.env.REACT_APP_ENDPOINT, "");
// const axiosClient = new AxiosClient("http://localhost:4000/", "");

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

export const postComment = async (formData: any) => {
  let localToken = await localTokenRepoInstance.getAccess()
  try {
    const url = `user/board/comment/write`;
    const headers = {
      Authorization: "Bearer " + `${localToken}`,
      "Content-Type": "multipart/form-data",
      processData: false,
    };
    const response = await axiosClient.post(url, headers, formData);
    return response;
  } catch (error) {
    throw new Error(`POST Board Error: ${error}`);
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

export const postLogin = async (formData: any) => {
  try {
    const url = "user/login";
    const currentDate = Date.now().toString();
    const response = await axiosClient.post(url, {}, formData);
    //@ts-ignore
    localTokenRepoInstance.setRefresh(response.data?.data?.refreshToken);
    //@ts-ignore
    localTokenRepoInstance.setAccess(response.data?.data?.accessToken);
    //@ts-ignore
    localTokenRepoInstance.setNickName(response.data?.data?.nickname);
    localStorage.setItem("expier_time", currentDate);
    //@ts-ignore
    console.log(response.data?.data?.nickname);
    //@ts-ignore
    return response.data?.data?.nickname;
  } catch (error) {
    throw new Error(`POST Login Error: ${error}`);
  }
};
export const postLogout = async () => {
  try {
    const url = `user/logout`;
    let access_token = await localTokenRepoInstance.getAccess();

    if (access_token === null) {
      access_token = await localTokenRepoInstance.getAccess();
      return access_token;
    }

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    await axiosClient
      .post(url, headers)
      .then(() => localTokenRepoInstance.remove());
  } catch (error) {
    throw new Error(`POST Logout Error: ${error}`);
  }
};

export const postReIssue = async (stableRefesh: any) => {
  try {
    const url = `user/reissue`;
    const headers = { Authorization: `Bearer ${stableRefesh}` };
    const response = await axiosClient.post(url, headers);

    //@ts-ignore
    const newAccessToken = response.data?.data?.accessToken;
    //@ts-ignore
    localTokenRepoInstance.setAccess(newAccessToken);
    //@ts-ignore
    return newAccessToken;
  } catch (error) {
    throw new Error(`POST REISSUE Error[토큰 발급 실패]: ${error}`);
  }
};
