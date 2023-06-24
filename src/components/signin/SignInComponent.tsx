import React, { Dispatch, SetStateAction, useEffect } from "react";

type SignInProps = {
  setStatus: Dispatch<SetStateAction<Number>>;
};

const SignInComponent = ({ setStatus }: SignInProps) => {
  const onClickButton = () => {
    setStatus(1);
  };

  useEffect(() => {
    setStatus(0);
  }, []);

  return (
    <div className="flex flex-col justify-between h-[740px] w-[24rem]">
      <div className="h-[510px] w-full"></div>
      <div className="h-[182px] w-full flex flex-col justify-between items-center">
        <button
          onClick={onClickButton}
          className="w-[350px] h-[50px] border border-st-gray-05 bg-st-gray-02 py-[13px] px-[16px] rounded-lg"
        >
          Google로 시작하기
        </button>
        <button
          onClick={onClickButton}
          className="w-[350px] h-[50px] py-[13px] px-[16px] rounded-lg bg-st-yellow"
        >
          카카오 계정으로 시작하기
        </button>
        <button
          onClick={onClickButton}
          className="w-[350px] h-[50px] py-[13px] px-[16px] rounded-lg bg-st-gray-10 text-white"
        >
          APPLE로 시작하기
        </button>
      </div>
    </div>
  );
};

export default SignInComponent;
