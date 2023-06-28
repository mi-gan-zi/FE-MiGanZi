import { VaildType } from "./vaildType";

export const vaildNick = (nickName: VaildType["nickName"]) => {
  const regex = /[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힝]*/;
  return regex.test(nickName);
};
export const validPassword = (password: VaildType["password"]) => {
  const regex = /^.{8,}$/;
  return regex.test(password);
};
