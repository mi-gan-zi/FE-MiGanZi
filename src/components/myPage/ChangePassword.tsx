import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { validPassword } from "components/common/utils/vaild";
import React, { useEffect, useRef, useState } from "react";
import createAxiosInstance from "utils/axiosConfig";
import { Header } from "./Header";

export const ChangePassword = () => {
  const [pwMsg, setPwMsg] = useState("소문자, 대문자, 숫자 포함 8자 이상");
  const [confirmMsg, setConfirmMsg] = useState("");
  const password_ref = useRef<HTMLInputElement>(null);
  const confirm_ref = useRef<HTMLInputElement>(null);
  const password = password_ref.current?.value;
  const confirm = confirm_ref.current?.value;
  const axios = createAxiosInstance();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => onClickSave(),
  });

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
    } else {
      setConfirmMsg("");
    }
  };

  const onClickSave = async () => {
    const password = password_ref.current?.value;
    const formData = new FormData();
    password && formData.append("newPassword", password);

    try {
      const res = await axios.post("user/update-password", formData);
      alert(res.data.message);
      setPwMsg("");
      setConfirmMsg("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-5">
        <div className="h-[160px]">
          <div className="w-full py-5 text-xl font-bold">비밀번호</div>
          <input
            type="password"
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
            type="password"
            ref={confirm_ref}
            className="w-[350px] border border-st-gray-05 px-3 py-[10px]"
            placeholder="비밀번호 입력"
          />
          <p className="mt-[17px] text-xs font-medium text-[#F22222]">
            {confirmMsg}
          </p>
        </div>
        <button
          onClick={() => mutation.mutate()}
          className="translate-y-[300px] w-[350px] px-4 py-[13px] rounded-lg bg-[#007DF0] text-st-white"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};
