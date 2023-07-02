import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [check, setCheck] = useState(false);
  const [err, setErr] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const nickname_ref = useRef<HTMLInputElement>(null);
  const password_ref = useRef<HTMLInputElement>(null);
  const check_ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const checkNickname = async () => {
    const nickname = nickname_ref.current?.value;
    if (nickname) {
      const res = await axios.get(
        process.env.REACT_APP_ENDPOINT + "user/check/" + `${nickname}`
      );
      if (res.data === "noNickName") {
        setErr("닉네임이 형식에 맞지 않습니다.");
      }
      if (res.data === "length") {
        setErr("닉네임을 8자 이하로 작성해주세요");
      }
      if (res.data === "exits") {
        setErr("중복된 닉네임입니다.");
      }
      if (res.data === "OK") {
        setErr("");
        setCheck(true);
        setMsg("사용 가능한 닉네임입니다.");
      }
    } else {
      setErr("닉네임을 입력해주세요");
    }
  };

  const signup = async (e: any) => {
    e.preventDefault();
    const nickname = nickname_ref.current?.value;
    const password = password_ref.current?.value;
    const checked = check_ref.current?.value;
    if (!check) {
      setErr("닉네임 중복확인을 해주세요!");
    } else if (password !== checked) {
      setErr("비밀번호를 확인해주세요!");
    } else if (!nickname || !password || !checked) {
      setErr("닉네임과 비밀번호를 입력해주세요!");
    } else {
      const formData = new FormData();
      formData.append("nickname", nickname);
      formData.append("password", password);
      const res = await axios.post(
        process.env.REACT_APP_ENDPOINT + "user/signup",
        formData
      );
      if (res.status === 200) {
        alert(`${nickname}님 회원가입을 축하드립니다.`);
        navigate("/login");
      }
    }
  };

  return (
    <form onSubmit={signup} className="px-5 overflow-y-auto">
      <div className="mt-10">
        <p className="text-xl font-bold">닉네임</p>
        <p className="text-active-blue">{msg}</p>
        <div className="mt-[30px] mb-[70px]">
          <input
            disabled={check}
            className="w-[265px] h-[44px] px-3 py-2.5 border border-st-gray-05 rounded mr-3 focus:outline-none"
            ref={nickname_ref}
            placeholder="닉네임 입력"
          />
          <button
            type="button"
            onClick={() => checkNickname()}
            className="w-[73px] h-[44px] px-3 py-2.5 bg-active-blue text-sm font-medium text-st-white rounded"
          >
            중복확인
          </button>
        </div>
      </div>
      <div className="mb-[90px]">
        <p className="text-xl font-bold">비밀번호</p>
        <input
          type="password"
          className="mt-[30px] w-[350px] h-[44px] px-3 py-2.5 border border-st-gray-05 rounded mr-3 focus:outline-none"
          ref={password_ref}
          placeholder="비밀번호 입력"
        />
      </div>
      <div className="mb-[100px]">
        <p className="text-xl font-bold">비밀번호 재확인</p>
        <input
          type="password"
          className="mt-[30px] w-[350px] h-[44px] px-3 py-2.5 border border-st-gray-05 rounded mr-3 focus:outline-none"
          ref={check_ref}
          placeholder="비밀번호 입력"
        />
      </div>
      <p className="text-alert-red text-center">{err}</p>
      <button className="w-[350px] h-[50px] px-[16px] py-[13px] bg-active-blue font-semibold text-st-white rounded-lg">
        가입완료
      </button>
    </form>
  );
};
