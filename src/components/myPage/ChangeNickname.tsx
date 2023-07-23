import createAxiosInstance from "utils/axiosConfig";
import { vaildNick } from "components/common/utils/vaild";
import React, { useEffect, useRef, useState } from "react";
import { Header } from "./Header";

export const ChangeNickname = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");
  const nickname = ref.current?.value;
  const axios = createAxiosInstance();

  useEffect(() => {
    if (nickname && !vaildNick(nickname)) {
      setMessage("닉네임이 형식에 맞지 않습니다.");
    }
  }, [nickname]);

  const changeNickname = async () => {
    const nickname = ref.current?.value;

    const nicknameData = new FormData();
    nickname && nicknameData.append("newNickname", nickname);
    try {
      const res = await axios.post("user/update-nickname", nicknameData);
      localStorage.removeItem("nickname");
      nickname && localStorage.setItem("nickname", nickname);
      console.log(res);
    } catch (err) {
      console.log(err);
      setMessage("중복된 닉네임입니다.");
    }
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
        <p className="text-[#F22222] text-xs font-medium mt-2">{message}</p>
      </div>
    </div>
  );
};
