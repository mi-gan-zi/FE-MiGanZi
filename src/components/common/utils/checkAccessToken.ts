import { localTokenRepoInstance } from "repository/LocalTokenRepository";

export const checkToken = async () => {
  const hasToken = await localTokenRepoInstance.getAccess();
  if (hasToken) {
    return true;
  }
};
