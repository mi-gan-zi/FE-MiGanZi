// import { AxioisClient } from "client/axios";

export class Apis {
  private axiosClient;
  constructor(axiosClient: any) {
    this.axiosClient = axiosClient;
  }
  // async getPost(page: number) {
  //   try {
  //     const url = `user/my-page/posts?page=${page}`;
  //     const response = await this.axiosClient.axios(url);
  //     console.log("1",response);
  //     return response;
  //   } catch (error) {
  //     throw new Error(`[api get userData]: ${error} `);
  //   }
  // }
  async createPost(data: any) {
    try {
      const url = `user/board/post/write`;
      const response = await this.axiosClient.axios(url);
      console.log("1", response);
      return response;
    } catch (error) {
      throw new Error(`[api get userData]: ${error} `);
    }
  }
}
