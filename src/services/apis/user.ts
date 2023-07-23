import { AxioisClient } from "client/axios";

export class UserService {
  private axiosClient;
  constructor(axiosClient: AxioisClient) {
    this.axiosClient = axiosClient;
  }
  async getPost(page: number) {
    try {
      const url = `ser/my-page/posts?page=${page}`;
      const response = await this.axiosClient.axios(url);
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(`[api get userData]: ${error} `);
    }
  }
}
