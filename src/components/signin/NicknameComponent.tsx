import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const NicknameComponent = () => {
  const input_ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate()

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const nickname = input_ref.current?.value;
    const headers = {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "*/*",
    };
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
    } else {
      const formData = new FormData();
      formData.append("nickname", nickname);
      try {
        const res = await axios.post(
          process.env.REACT_APP_ENDPOINT + "user/signup",
          formData
        );
        if (res.status === 200) {
          const response = await axios.post(
            process.env.REACT_APP_ENDPOINT + "user/login",
            formData
          );
          console.log(response)
          if (response.status === 200) {
            localStorage.setItem("nickname", nickname);
            alert(`${nickname}님
          가입을 축하합니다!`);
          navigate("/")
          }
        }
      } catch (err) {
        alert("중복된 닉네임입니다!");
        console.log(err);
      }
    }
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <div className="h-[600px] w-[390px] flex flex-col items-center mt-6 py-5">
        <input
          ref={input_ref}
          className="w-[350px] h-[44px] px-[12px] py-[10px] border rounded focus:outline-none"
          placeholder="닉네임 입력"
        />
        <div className="w-[350px] mt-3">
          <p>- 닉네임 규정 설명</p>
          <p>- 닉네임 변경시 30일간 변경불가</p>
        </div>
      </div>
      <div className="w-[390px] flex items-center">
        <button className="w-[350px] h-[50px] px-[16px] py-[13px] bg-[#007DF0] text-st-white rounded-lg mx-auto">
          가입 완료
        </button>
      </div>
    </form>
  );
};
