import React from "react";
import { useNavigate } from "react-router-dom";

export const Container = () => {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");

  return (
    <div>
      <div className="w-full h-[62px] flex items-center justify-start text-st-gray-10 text-xl font-semibold px-5">
        마이페이지
      </div>
      <hr className="border border-st-gray-03" />
      <div className="w-full px-5 py-6 flex flex-col justify-center items-center gap-2">
        <img
          alt="user"
          className="w-[90px] h-[90px] rounded-[50%]"
          src="https://blog.kakaocdn.net/dn/GHYFr/btrsSwcSDQV/UQZxkayGyAXrPACyf0MaV1/img.jpg"
        />
        <p>{nickname}</p>
        <button className="px-8 rounded-[100px] flex items-center justify-center border border-st-gray-03 bg-st-gray-01 text-st-gray-05">
          프로필 변경
        </button>
      </div>
      <div className="w-full h-[14px] bg-st-gray-02"></div>
      <div className="px-5 py-4">
        <div className="py-4 text-xl font-semibold">개인정보</div>
        <div
          className="py-4 text-base font-normal cursor-pointer"
          onClick={() => navigate("/nickname")}
        >
          닉네임 변경
        </div>
        <div
          className="py-4 text-base font-normal cursor-pointer"
          onClick={() => navigate("/password")}
        >
          비밀번호 변경
        </div>
        <div className="py-4 text-base font-normal">알림설정</div>
      </div>
      <div className="w-full h-[14px] bg-st-gray-02"></div>
      <div className="px-5 py-4">
        <div className="py-4 text-xl font-semibold">내 활동</div>
        <div className="py-4 text-base font-normal">내가 쓴 글</div>
        <div className="py-4 text-base font-normal">내가 쓴 댓글</div>
        <div className="py-4 text-base font-normal text-[#f22222]">
          로그아웃
        </div>
        <div className="py-4 text-base font-normal text-st-gray-05">
          회원탈퇴
        </div>
      </div>
    </div>
  );
};
