import React from "react";
import { Header } from "./Header";

export const ChangeNickname = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col px-5">
        <div className="py-5 text-xl font-bold">
          <p>닉네임</p>
        </div>
        <div className="flex">
          <input
            placeholder="닉네임 입력"
            className="w-[265px] border border-st-gray-05 rounded px-3 py-[10px] mr-3"
          />
          <button className="rounded bg-[#007DF0] px-3 py-[10px] text-st-white text-sm">
            중복확인
          </button>
        </div>
        <p></p>
      </div>
    </div>
  );
};
