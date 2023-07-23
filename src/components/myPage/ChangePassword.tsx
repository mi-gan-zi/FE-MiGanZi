import axios from "axios";
import { validPassword } from "components/common/utils/vaild";
import React, { useEffect, useRef, useState } from "react";
import { Header } from "./Header";

export const ChangePassword = () => {
  const [pwMsg, setPwMsg] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");
  const password_ref = useRef<HTMLInputElement>(null);
  const confirm_ref = useRef<HTMLInputElement>(null);
  const password = password_ref.current?.value;
  const confirm = confirm_ref.current?.value;

  useEffect(() => {
    if (password && !validPassword(password)) {
      setPwMsg("비밀번호 형식에 맞지 않습니다.");
    }
    if (confirm && !validPassword(confirm)) {
      setConfirmMsg("비밀번호 형식에 맞지 않습니다.");
    }
    checkPassword();
  }, [password]);

  const checkPassword = () => {
    const password = password_ref.current?.value;
    const confirm = confirm_ref.current?.value;
    if (password !== confirm) {
      setConfirmMsg("비밀번호와 일치하지 않습니다.");
      return false;
    } else {
      setConfirmMsg("");
      return true;
    }
  };

  const onClickSave = async () => {
    const password = password_ref.current?.value;
    if (checkPassword()) {
      try {
        // const res = await axios.post()
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="px-5">
        <div className="h-[160px]">
          <div className="w-full py-5 text-xl font-bold">비밀번호</div>
          <input
            ref={password_ref}
            className="w-[350px] border border-st-gray-05 px-3 py-[10px]"
            placeholder="비밀번호 입력"
          />
          <p className="mt-[17px] text-xs font-medium text-[#F22222]">
            {pwMsg}
          </p>
        </div>
        <div>
          <div className="w-full py-5 text-xl font-bold">비밀번호 재확인</div>
          <input
            ref={confirm_ref}
            className="w-[350px] border border-st-gray-05 px-3 py-[10px]"
            placeholder="비밀번호 입력"
          />
          <p className="mt-[17px] text-xs font-medium text-[#F22222]">
            {confirmMsg}
          </p>
        </div>
        <button
          onClick={onClickSave}
          className="translate-y-[300px] w-[350px] px-4 py-[13px] rounded-lg bg-[#007DF0] text-st-white"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};
