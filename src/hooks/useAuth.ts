import { useEffect, useState } from "react";
import { localTokenRepoInstance } from "repository/LocalTokenRepository";
import { postLogin } from "services/apis/miganziService";

export default function useAuth() {
  const [isUser, setIsUser] = useState(false);
  const [getIsToken, setIsToken] = useState(false);
  const login = async (nickName: string, password: string) => {
    const formData = new FormData();
    if (nickName && password) {
      formData.append("nickname", nickName);
      formData.append("password", password);
      const response = await postLogin(formData);
      setIsUser(true);
      return response;
    }
  };
  return { login, isUser, getIsToken, setIsUser };
}
