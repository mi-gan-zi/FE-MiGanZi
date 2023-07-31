import { AxiosClient } from "services/axiosClient/axios";
import { localTokenRepoInstance } from "repository/LocalTokenRepository";
import { IPopular, IPost, IPostContent } from "../../@types/post.type";

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

// export const getPopularPost = async () => {
//   try {
//     const url = `user/board/popular-post`;
//     const response = await axiosClient.axios(url);
//     return response;
//   } catch (error) {
//     throw new Error(`PopularPost get ERR : ${error}`);
//   }
// };

export const getPopularPost = async () => {
  return axiosClient
    .get<IPopular[] | undefined>(`user/board/popular-post`)
    .then((res: any) => res.data)
    .catch((error: any) => {
      throw new Error(`PopularPost get ERR : ${error}`);
    });
};

// export const getInfinityPost = async () => {
//   return axiosClient
//     .get<any>(`user/board/posts?page=0`) // data.content에서 타입에러 발생해서 any로 일단 처리
//     .then((res) => res.data)
//     .catch((error) => {
//       throw new Error(`InfinityPost get ERR : ${error}`);
//     });
// };
