import React, { useState } from "react";
import { postLogin } from "services/apis/miganziService";

//TODO: login, logout , 유저정보, 토큰은 api 관리
export default function useAuth() {
  const [user, setUser] = useState(null);
  /**
   * interface: nickName, passWord
   */
  const login = async (nickName: string, password: string) => {
    console.log(nickName, password);
    const formData = new FormData();

    if (nickName && password) {
      formData.append("nickname", nickName);
      formData.append("password", password);
      await postLogin(formData).then(setUser);
    }
    console.log(user);
  };
  return { user, login };
}
