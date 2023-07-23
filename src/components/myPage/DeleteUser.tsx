import React from "react";
import { useNavigate } from "react-router-dom";
import createAxiosInstance from "utils/axiosConfig";
import { Header } from "./Header";

export const DeleteUser = () => {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");
  const axios = createAxiosInstance();

  const DeleteButtonHandler = () => {
    try {
      const res = axios.post("user/withdrawal", {});
      console.log(res);
      localStorage.removeItem("token");
      localStorage.removeItem("refresh-token");
      localStorage.removeItem("nickname");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-5">
        <div className="py-5 text-xl font-bold">{nickname}님</div>
        <div>
          <p className="text-[#8B8B8B] text-base font-semibold mt-[10px]">
            탈퇴를 위해서, 가입하신 닉네임을 입력해주세요.
          </p>
          <input className="w-[350px] py-[10px] px-3 mt-[10px] rounded border border-st-gray-05" />
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={DeleteButtonHandler}
            className="w-[350px] h-[50px] translate-y-[400px] px-4 py-[13px] rounded-lg bg-[#007DF0] text-st-white"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};
