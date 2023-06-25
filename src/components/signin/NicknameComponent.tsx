import React, { useRef } from "react";

export const NicknameComponent = () => {
  const input_ref = useRef<HTMLInputElement>(null);

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const nickname = input_ref.current?.value;
    if (nickname === "") {
      alert("닉네임을 입력해주세요.");
    }
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <div className="h-[770px] w-[390px] flex flex-col items-center">
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
