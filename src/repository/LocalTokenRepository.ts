import { postReIssue } from "services/apis/mianziService";
import constants from "utils/consts/LocalRepo";
export class LocalTokenRepository {
  private refresh_token = constants.REFRESH_KEY;
  private access_token = constants.ACCESS_TOKEN_KEY;
  private expier_time = constants.EXPIER_TIME;
  private nickname = constants.NiCK_NAME_KEY;

  setRefresh(refresh_token: string) {
    localStorage.setItem(this.refresh_token, refresh_token);
  }

  setAccess(access_token: string, expier_time: number) {
    localStorage.setItem(this.access_token, access_token);
    localStorage.setItem(this.access_token, expier_time.toString());
  }

  setNickName(nickname: string) {
    localStorage.setItem(this.nickname, nickname);
  }

  async getAccess(): Promise<string | null> {
    const stableAccessToken = localStorage.getItem(this.access_token);
    const refreshToken = localStorage.getItem(this.refresh_token);
    const getExpierTimeStr = localStorage.getItem(this.expier_time);
    // if (!getExpierTimeStr && !accessToken) return null;

    const expierToNum = Number(getExpierTimeStr);
    const currentTime = Date.now();

    const timeElapsed = currentTime - expierToNum;
    const isExpier = Math.floor(timeElapsed / 1000) > 1800;

    const getNewAccessToken = async (refreshToken: string | null) => {
      try {
        const response = await postReIssue(refreshToken);
        console.log("debugging LocalStorage Repo file response", response);
        return response;
      } catch (e) {
        return null;
      }
    };

    const result: string | null = isExpier
      ? await getNewAccessToken(refreshToken)
      : stableAccessToken;

    return result;
  }
  getRefresh(): string | null {
    const refreshToken = localStorage.getItem(this.refresh_token);
    return refreshToken;
  }
  remove() {
    localStorage.removeItem(this.access_token);
    localStorage.removeItem(this.refresh_token);
    localStorage.removeItem(this.nickname);
  }
}
export const localTokenRepoInstance = new LocalTokenRepository();
