import { Client } from "client/axios";

export class CreateService {
  private axiosClient: Client;
  constructor(axiosClient: Client) {
    this.axiosClient = axiosClient;
  }

  async create() {
    const response = await this.axiosClient.axios("user/board/post", {
      headers: {
        "Content-Type": "multipart/form-data",
        processData: false,
      },
    });
  }
}
