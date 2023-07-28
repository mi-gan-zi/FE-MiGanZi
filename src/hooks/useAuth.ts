import React, { useState } from "react";
import { postLogin } from "services/apis/miganziService";

//TODO: login, logout , 유저정보, 토큰은 api 관리
export default function useAuth() {
  const [user, setUser] = useState(null);
  /**
   * interface: nickName, passWord
   */
  const login = (nickName: string, password: string) => {
    const formData = new FormData();
    if (!nickName || !password)
      return alert("닉네임과 비밀번호를 확인해주세요.");
    if (nickName && password) {
      formData.append("nickname", nickName);
      formData.append("password", password);
      postLogin(formData).then(setUser);
    }
    console.log(user);
  };
  return { user, login };
}
