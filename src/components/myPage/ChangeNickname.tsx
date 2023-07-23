import axios from "axios";
import React, { useRef, useState } from "react";
import { Header } from "./Header";

export const ChangeNickname = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");

  const changeNickname = () => {
    const nickname = ref.current?.value;
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const nicknameData = new FormData();
    nickname && nicknameData.append("newNickname", nickname);
    const res = axios.post(
      process.env.REACT_APP_ENDPOINT + "user/update-nickname",
      nicknameData,
      { headers }
    );
    console.log(res);
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col px-5">
        <div className="py-5 text-xl font-bold">
          <p>닉네임</p>
        </div>
        <div className="flex">
          <input
            ref={ref}
            placeholder="닉네임 입력"
            className="w-[265px] border border-st-gray-05 rounded px-3 py-[10px] mr-3"
          />
          <button
            onClick={changeNickname}
            className="rounded bg-[#007DF0] px-3 py-[10px] text-st-white text-sm"
          >
            중복확인
          </button>
        </div>
        <p></p>
      </div>
    </div>
  );
};
