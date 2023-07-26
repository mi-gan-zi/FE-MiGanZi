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

  getAccess(): string | null {
    const accessToken = localStorage.getItem(this.access_token);
    const getExpierTimeStr = localStorage.getItem(this.expier_time);
    console.log(getExpierTimeStr);
    if (!getExpierTimeStr || !accessToken) return null;

    const expierToNum = Number(getExpierTimeStr);
    console.log(expierToNum);
    const currentTime = Date.now();
    console.log(currentTime);

    const timeElapsed = currentTime - expierToNum;
    const isExpier = Math.floor(timeElapsed / 1000) > 1800;
    // TODO:  reissue api를 정의
    const newAccess = () => {
      return "access";
    };
    // TODO
    return isExpier ? newAccess() : accessToken;
    // return accessToken;
  }
  remove() {
    localStorage.removeItem(this.access_token);
    localStorage.removeItem(this.refresh_token);
    localStorage.removeItem(this.nickname);
  }
}
export const localTokenRepoInstance = new LocalTokenRepository();
