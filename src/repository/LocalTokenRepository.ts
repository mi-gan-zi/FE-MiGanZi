import { postReIssue } from "services/apis/miganziService";
import constants from "utils/consts/LocalRepo";
export class LocalTokenRepository {
  private refresh_token = constants.REFRESH_KEY;
  private access_token = constants.ACCESS_TOKEN_KEY;
  private expire_time = constants.EXPIRE_TIME;
  private nickname = constants.NiCK_NAME_KEY;

  setRefresh(refresh_token: string) {
    localStorage.setItem(this.refresh_token, refresh_token);
  }

  setAccess(access_token: string) {
    localStorage.setItem(this.access_token, access_token);
    // localStorage.setItem(this.access_token, expier_time.toString());
  }

  setNickName(nickname: string) {
    localStorage.setItem(this.nickname, nickname);
  }

  getNickName() {
    localStorage.getItem(this.nickname);
  }
  getAccess(): Promise<string | null> {
    const stableAccessToken = localStorage.getItem(this.access_token);
    const refreshToken = localStorage.getItem(this.refresh_token);
    const getExpireTimeStr = localStorage.getItem(this.expire_time);
    //@ts-ignore
    if (!getExpireTimeStr && !stableAccessToken) return null;

    const expierToNum = Number(getExpireTimeStr);
    const currentTime = Date.now();

    const timeElapsed = currentTime - expierToNum;
    const isExpier = Math.floor(timeElapsed / 1000) > 1800;

    const getNewAccessToken = async (
      refreshToken: string
    ): Promise<string | null> => {
      try {
        const response = await postReIssue(refreshToken);
        return response;
      } catch (e) {
        return null;
      }
    };

    const result: any = isExpier
      ? //@ts-ignore
        getNewAccessToken(refreshToken)
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
