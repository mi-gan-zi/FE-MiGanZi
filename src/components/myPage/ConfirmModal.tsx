import React, { Dispatch, SetStateAction } from "react";

type ModalProps = {
  setModal: Dispatch<SetStateAction<boolean>>;
  DeleteButtonHandler: () => void;
};

export const ConfirmModal = ({ setModal, DeleteButtonHandler }: ModalProps) => {
  return (
    <div className="w-full h-screen bg-st-gray-07/50 flex items-center justify-center absolute top-0 z-20">
      <div className="w-[280px] h-[154px] rounded-xl bg-st-white flex flex-col items-center justify-between">
        <div className="text-center translate-y-9">
          <p>미간지에서</p>
          <p>정말 탈퇴하실건가요?</p>
        </div>
        <div className="w-full border-t-2 border-t-st-gray-03 flex text-center">
          <div
            onClick={DeleteButtonHandler}
            className=" border-r-2 px-[10px] py-4 w-2/4 text-st-gray-06 text-base font-semibold border-r-st-gray-03 cursor-pointer"
          >
            예
          </div>
          <div
            onClick={() => setModal(false)}
            className="px-[10px] py-4 w-2/4 text-base font-semibold text-[#F22222] cursor-pointer"
          >
            아니오
          </div>
        </div>
      </div>
    </div>
  );
};
