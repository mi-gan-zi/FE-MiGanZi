import React, { Dispatch, SetStateAction, useEffect } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Line } from "../../assets/line.svg";
import { ReactComponent as Apple } from "../../assets/apple.svg";
import { ReactComponent as Google } from "../../assets/google.svg";
import { ReactComponent as Kakao } from "../../assets/kakao.svg";

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
      <div className="h-[510px] w-full flex flex-col items-center ">
        <div className="translate-x-3">
          <Line className="mt-2"></Line>
        </div>
        <div className="flex flex-col ml-[35px]">
          <Logo></Logo>
          <div className="mb-[50px]">
            <p>미(간)지의 장소를 탐색하기 위해</p>
            <p>회원가입/로그인을 진행헤주세요!</p>
          </div>
        </div>
        <div className="flex text-left w-[326px] translate-y-[260px]">
          <p className="text-[#A5A5A5] text-xs">
            '미(간)지'는 네이밍의 담긴 의미처럼, 아직 다른 사람들에게 발견 되지
            않은 미지의 공간을 특별한 가치를 담은 큐레이팅으로 제공합니다.
          </p>
        </div>
      </div>
      <div className="h-[182px] w-full flex flex-col justify-between items-center">
        <button
          onClick={onClickButton}
          className="w-[350px] h-[50px] border border-st-gray-05 bg-st-gray-02 py-[13px] px-[16px] rounded-lg flex items-center justify-center"
        >
          <Google className="mr-3" />
          Google로 시작하기
        </button>
        <button
          onClick={onClickButton}
          className="w-[350px] h-[50px] py-[13px] px-[16px] rounded-lg bg-st-yellow flex items-center justify-center"
        >
          <Kakao className="mr-3" />
          카카오 계정으로 시작하기
        </button>
        <button
          onClick={onClickButton}
          className="w-[350px] h-[50px] py-[13px] px-[16px] rounded-lg bg-st-gray-10 text-st-white flex items-center justify-center"
        >
          <Apple className="mr-3" />
          APPLE로 시작하기
        </button>
      </div>
    </div>
  );
};

export default SignInComponent;
