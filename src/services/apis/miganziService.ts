import { AxiosClient } from "services/axiosClient/axios";
import { localTokenRepoInstance } from "repository/LocalTokenRepository";
import { IPopular, IPost, IPostContent } from "../../@types/post.type";
import { AxiosResponse } from "axios";

const axiosClient = new AxiosClient(process.env.REACT_APP_ENDPOINT, "");
// const axiosClient = new AxiosClient("http://localhost:4000/", "");

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

export const postComment = async (formData: {}) => {
  let localToken = await localTokenRepoInstance.getAccess();
  try {
    const url = `user/board/comment/write`;
    const headers = {
      Authorization: "Bearer " + `${localToken}`,
      "Content-Type": "multipart/form-data",
      processData: false,
    };
    const options = {
      method: "post",
      data: formData,
      headers,
    };
    const response = await axiosClient.axios(url, options);
    return response;
  } catch (error) {
    throw new Error(`POST Board Error: ${error}`);
  }
};

export const postBoard = async (data: {}) => {
  let access_token = await localTokenRepoInstance.getAccess();

  if (access_token === null) {
    access_token = await localTokenRepoInstance.getAccess();
    return access_token;
  }
  try {
    const url = `user/board/post/write`;
    const headers = {
      Authorization: "Bearer " + `${access_token}`,
      "Content-Type": "multipart/form-data",
      processData: false,
    };
    const options = {
      method: "post",
      data,
      headers,
    };

    const response = await axiosClient.axios(url, options);
    return response;
  } catch (error) {
    throw new Error(`POST Board Error: ${error}`);
  }
};

export const getPopularPost = async () => {
  try {
    const url = `user/board/popular-post`;
    const response = await axiosClient.axios(url);
    return response;
  } catch (error) {
    throw new Error(`PopularPost get ERR : ${error}`);
  }
};

export const getPopularPostService = async () => {
  return axiosClient
    .axios<IPopular[] | undefined>(`user/board/popular-post`)
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(`PopularPost get ERR : ${error}`);
    });
};

export const getInfinityPost = async () => {
  return axiosClient
    .axios<{ content: [] }>(`user/board/posts?page=0`) // data.content에서 타입에러 발생해서 any로 일단 처리
    .then((res) => console.log(res.data?.content))
    .catch((error) => {
      throw new Error(`InfinityPost get ERR : ${error}`);
    });
};

/**
 * User API
 */

export const postLogin = async (formData: {}) => {
  try {
    const url = "user/login";
    const currentDate = Date.now().toString();
    const options = { method: "post", data: formData };
    const response: AxiosResponse<any> = await axiosClient.axios(url, options);

    localTokenRepoInstance.setRefresh(
      response.data.data.refreshToken.toString()
    );
    localTokenRepoInstance.setAccess(response.data.data.accessToken);
    localTokenRepoInstance.setNickName(response.data.data.nickname);
    localStorage.setItem("expier_time", currentDate);

    return response.data.data.nickname;
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
    const options = { method: "post", headers };
    await axiosClient
      .axios(url, options)
      .then(() => localTokenRepoInstance.remove());
  } catch (error) {
    throw new Error(`POST Logout Error: ${error}`);
  }
};

export const postReIssue = async (stableRefesh: {}) => {
  try {
    const url = `user/reissue`;
    const options = {
      method: "post",
      headers: {
        Authorization: `Bearer ${stableRefesh}`,
      },
    };
    const response = await axiosClient.axios(url, options);

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
