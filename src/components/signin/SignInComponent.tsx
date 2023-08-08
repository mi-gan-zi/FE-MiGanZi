import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Line } from "../../assets/line.svg";
import { ReactComponent as Apple } from "../../assets/apple.svg";
import { ReactComponent as Google } from "../../assets/google.svg";
import { ReactComponent as Kakao } from "../../assets/kakao.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import constants from "utils/consts/LocalRepo";
import { useMutation } from "@tanstack/react-query";

const SignInComponent = () => {
  const nickname_ref = useRef<HTMLInputElement>(null);
  const password_ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const currentDate = Date.now().toString();
  const mutation = useMutation({
    mutationFn: (e) => login(e),
  });

  const login = async (e: any) => {
    e.preventDefault();
    const nickname = nickname_ref.current?.value;
    const password = password_ref.current?.value;
    const formData = new FormData();
    if (!nickname || !password) {
      alert("닉네임과 비밀번호를 적어주세요!");
    } else {
      formData.append("nickname", nickname);
      formData.append("password", password);
      try {
        const res = await axios.post(
          process.env.REACT_APP_ENDPOINT + "user/login",
          formData
        );
        if (res.status === 200) {
          localStorage.setItem(
            constants.ACCESS_TOKEN_KEY,
            res.data.data.accessToken
          );
          localStorage.setItem(
            constants.REFRESH_KEY,
            res.data.data.refreshToken
          );
          localStorage.setItem(constants.EXPIRE_TIME, currentDate);
          localStorage.setItem(constants.NiCK_NAME_KEY, res.data.data.nickname);
          alert("미(간)지에 오신 걸 환영합니다." + nickname + "님");
          navigate("/");
        }
      } catch (err) {
        alert("닉네임과 비밀번호를 다시 확인해주세요!");
      }
    }
  };

  return (
    <div className="flex flex-col justify-between h-[665px] w-[24rem] px-5 overflow-y-auto">
      <div className="h-[310px] w-full flex flex-col items-center ">
        <div className="translate-x-3">
          <Line className="mt-2"></Line>
        </div>
        <div className="flex flex-col pl-5">
          <Logo></Logo>
          <div className="mb-[150px]">
            <p>미(간)지의 장소를 탐색하기 위해</p>
            <p>로그인을 진행헤주세요!</p>
          </div>
        </div>
        {/* <div className="flex text-left w-[326px] translate-y-[200px]">
          <p className="text-[#A5A5A5] text-xs">
            '미(간)지'는 네이밍의 담긴 의미처럼, 아직 다른 사람들에게 발견 되지
            않은 미지의 공간을 특별한 가치를 담은 큐레이팅으로 제공합니다.
          </p>
        </div> */}
      </div>
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={(e: any) => mutation.mutate(e)} className="mb-[35px]">
          <input
            ref={nickname_ref}
            placeholder="nickname"
            className="w-[350px] h-[50px] border border-st-gray-09 rounded-lg py-[13px] px-[16px] mb-4 focus:outline-none"
          />
          <input
            ref={password_ref}
            placeholder="password"
            type="password"
            className="w-[350px] h-[50px] border border-st-gray-09 rounded-lg py-[13px] px-[16px] mb-4 focus:outline-none"
          />
          <div className="flex justify-between mb-4">
            <div>
              <input type="checkbox" className="mr-2" />
              자동로그인
            </div>
            <span>비밀번호를 잊으셨나요?</span>
          </div>
          <button
            disabled={mutation.isLoading}
            className="w-[350px] h-[47px] rounded-lg py-[13px] px-[16px] bg-st-gray-09 text-st-white text-sm font-semibold"
          >
            Log in
          </button>
        </form>
        <div className="border-t border-st-gray-03 w-[327px] flex items-center justify-center pt-[20px] text-st-gray-06">
          <p>
            미(간)지에 처음이신가요?
            <a href="./signup" className="underline cursor-pointer">
              회원가입하기
            </a>
          </p>
        </div>
      </div>
      {/* <div className="h-[182px] w-full flex flex-col items-center justify-between">
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
      </div> */}
    </div>
  );
};

export default SignInComponent;
