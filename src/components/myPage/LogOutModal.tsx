import React from "react";

export const LogOutModal = () => {
  return (
    <div className="w-full h-screen bg-st-gray-07/50 flex items-center justify-center absolute top-0 left-0 z-20">
      <div className="w-[280px] h-[154px] rounded-xl bg-st-white flex flex-col items-center justify-between">
        <div className="text-center translate-y-9">
          <p>미(간)지에서</p>
          <p>
            <span className="text-[#F22222]">로그아웃</span> 되었습니다.
          </p>
        </div>
      </div>
    </div>
  );
};
