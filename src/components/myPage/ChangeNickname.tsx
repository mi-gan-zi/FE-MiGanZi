import createAxiosInstance from "utils/axiosConfig";
import { vaildNick } from "components/common/utils/vaild";
import React, { useEffect, useRef, useState } from "react";
import { Header } from "./Header";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const ChangeNickname = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");
  const nickname = ref.current?.value;
  const axios = createAxiosInstance();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => changeNickname(),
  });

  useEffect(() => {
    if (nickname && !vaildNick(nickname)) {
      setMessage("닉네임이 형식에 맞지 않습니다.");
    }
  }, [nickname]);

  const changeNickname = async () => {
    const nickname_content = ref.current?.value;
    const formData = new FormData();
    if (!nickname_content) {
      alert("새로운 닉네임을 입력해주세요.");
    } else {
      formData.append("newNickname", nickname_content);
      try {
        const res = await axios.post("user/update-nickname", formData);
        localStorage.clear();
        localStorage.setItem("nickname", res.data.data.nickname);
        localStorage.setItem("token", res.data.data.accessToken);
        localStorage.setItem("refresh-token", res.data.data.refreshToken);
        alert(`${res.data.data.nickname}님으로 변경되셨습니다.`);
      } catch (err) {
        console.log(err);
        setMessage("중복된 닉네임입니다.");
      }
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
            onClick={() => mutation.mutate()}
            className="rounded bg-[#007DF0] px-3 py-[10px] text-st-white text-sm"
            disabled={mutation.isLoading}
          >
            중복확인
          </button>
        </div>
        <p className="text-[#F22222] text-xs font-medium mt-2">{message}</p>
      </div>
    </div>
  );
};
