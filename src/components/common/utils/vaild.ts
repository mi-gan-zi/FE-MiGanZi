import { VaildType } from "./vaildType";

export const vaildNick = (nickName: VaildType["nickName"]) => {
  const regex = /[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힝]*/;
  return regex.test(nickName);
};
export const validPassword = (password: VaildType["password"]) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(password);
};
