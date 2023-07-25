import constants from "utils/constans/LocalLepo";
export class LocalTokenRepository {
  private refresh_token = constants.REFRESH_KEY;
  private token = constants.TOKEN_KEY;
  private nickname = constants.NiCK_NAME_KEY;

  setRefresh(refresh_token: string) {
    localStorage.setItem(this.refresh_token, refresh_token);
  }

  setToken(token: string) {
    localStorage.setItem(this.refresh_token, token);
  }

  setNickName(nickname: string) {
    localStorage.setItem(this.nickname, nickname);
  }

  get(): string | null {
    return localStorage.getItem(this.token);
  }
  remove() {
    localStorage.removeItem(this.token);
  }
}
