import { useEffect, useState } from "react";
import { localTokenRepoInstance } from "repository/LocalTokenRepository";
import { postLogin } from "services/apis/miganziService";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const login = async (nickName: string, password: string) => {
    const formData = new FormData();

    if (nickName && password) {
      formData.append("nickname", nickName);
      formData.append("password", password);
      await postLogin(formData).then(setUser);
    }
  };
  useEffect(() => {
    const checkToken = async () => {
      const hasToken = await localTokenRepoInstance.getAccess();
      if (hasToken) {
        setIsUser(true);
      }
    };
    checkToken();
  }, [isUser]);
  return { user, login, isUser };
}
