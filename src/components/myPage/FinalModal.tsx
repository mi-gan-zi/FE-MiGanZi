import React, { Dispatch, SetStateAction } from "react";

type FinalProps = {
  setFinalModal: Dispatch<SetStateAction<boolean>>;
};

export const FinalModal = ({ setFinalModal }: FinalProps) => {
  return (
    <div className="w-full h-screen bg-st-gray-07/50 flex items-center justify-center absolute inset-y-0 z-20">
      <div className="w-[280px] h-[154px] rounded-xl bg-st-white flex flex-col items-center justify-between translate-y-20">
        <div className="text-center translate-y-9">
          <p>미(간)지에서</p>
          <p>탈퇴가 되었습니다.</p>
        </div>
        <div
          onClick={() => setFinalModal(false)}
          className="w-full border-t-2 border-t-st-gray-03 flex text-center text-[#007DF0] text-base font-semibold"
        >
          확인
        </div>
      </div>
    </div>
  );
};
