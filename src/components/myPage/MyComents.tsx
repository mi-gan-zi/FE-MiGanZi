import React, { useState } from "react";
import { Header } from "./Header";
import { ReactComponent as NonImage } from "../../assets/non_image.svg";

export const MyComents = () => {
  const [total, setTotal] = useState<number>(0);

  return (
    <div>
      <Header />
      <div className="px-5">
        <p className="text-st-gray-10 text-base font-medium">
          내가 쓴 댓글 <span className="text-[#007DF0]">{total}</span>
        </p>
        {total === 0 && (
          <div className="w-full h-[560px] flex flex-col items-center justify-center">
            <NonImage />
            <div className="h-[75px] flex flex-col items-center justify-between">
              <p className="text-st-gray-08 text-lg font-semibold">
                작성한 댓글이 없어요.
              </p>
              <p className="text-st-gray-06 text-base font-medium">
                다양한 게시물에 대한 감상평을 남겨주세요.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
