import { localTokenRepoInstance } from "repository/LocalTokenRepository";

export const checkToken = async () => {
  const hasToken = await localTokenRepoInstance.getAccess();
  if (hasToken) {
    return true;
  }
};
//checkToken이 호출되면 토큰 유무와 유효기간을 체크(getAccess에서)한다
