import { checkToken } from "components/common/utils/checkAccessToken";
import { useEffect, useState } from "react";
import { localTokenRepoInstance } from "repository/LocalTokenRepository";
import { postLogin } from "services/apis/miganziService";

export default function useAuth() {
  const [isUser, setIsUser] = useState(false);

  const login = async (nickName: string, password: string) => {
    const formData = new FormData();
    if (nickName && password) {
      formData.append("nickname", nickName);
      formData.append("password", password);
      const response = await postLogin(formData);
      const isToken = await checkToken();
      console.log("useAuth is Token :", isToken);
      if (isToken) {
        setIsUser(isToken);
      }
      return response;
    }
  };

  return { login, isUser };
}
// check fucn 다른데서 사용? yes
