import React from "react";

export const Text = () => {
  return (
    <div className="w-[390px] h-[178px] px-5">
      <div className="w-[350px] h-[70px] font-bold text-xl flex items-center">
        <h1>장소 설명 입력</h1>
      </div>
      <textarea
        placeholder="그 날 장소에서 느꼈던 추억을 남겨주세요.
최대 4줄로 작성해주세요.

"
        className="border border-st-gray-04 w-[350px] h-[108px] rounded p-3 resize-none"
      />
    </div>
  );
};
