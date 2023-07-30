import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxiosInstance from "utils/axiosConfig";
import { LogOutModal } from "./LogOutModal";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "services/apis/miganziService";
import useAuth from "hooks/useAuth";

export const Container = () => {
  const [enabled, setEnabled] = useState(false);
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");
  const { setIsUser } = useAuth();
  const mutation = useMutation(() => postLogout(), {
    onSuccess: () => {
      navigate("/login");
      setIsUser(false);
    },
    onError: (e) => {
      console.log("errer mutation", e);
    },
  });
  const logOut = () => {
    mutation.mutate();
  };

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, []);

  // const logOut = async () => {
  //   const res = await axios.post("user/logout", {});
  //   if (res.status === 200) {
  //     setLogout(true);
  //     const logoutTime = setTimeout(() => {
  //       setLogout(false);
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("nickname");
  //       localStorage.removeItem("refresh-token");
  //       navigate("/login");
  //     }, 2000);
  //     clearTimeout(logoutTime);
  //   }
  // };
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
          src="https://storage.googleapis.com/miganzi-bucket/profile_image.png"
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
        <div className="flex items-center justify-between">
          <div className="py-4 text-base font-normal cursor-pointer">
            알림설정
          </div>
          <div className="flex">
            <label className="inline-flex relative items-center mr-5 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={enabled}
                readOnly
              />
              <div
                onClick={() => {
                  setEnabled(!enabled);
                }}
                className="w-11 h-6 bg-st-gray-03 rounded-full peer  peer-focus:bg-active-blue  peer-checked:after:translate-x-full peer-checked:after:border-st-white peer-checked:after:bg-st-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
              ></div>
            </label>
          </div>
        </div>
      </div>

      <div className="w-full h-[14px] bg-st-gray-02"></div>
      <div className="px-5 py-4">
        <div className="py-4 text-xl font-semibold">내 활동</div>
        <div
          onClick={() => navigate("/myposts")}
          className="py-4 text-base font-normal cursor-pointer"
        >
          내가 쓴 글
        </div>
        <div
          onClick={() => navigate("/mycommets")}
          className="py-4 text-base font-normal cursor-pointer"
        >
          내가 쓴 댓글
        </div>
        <div
          onClick={logOut}
          className="py-4 text-base font-normal text-[#f22222] cursor-pointer"
        >
          로그아웃
        </div>
        <div
          onClick={() => navigate("/delete")}
          className="py-4 text-base font-normal text-st-gray-05 cursor-pointer"
        >
          회원탈퇴
        </div>
      </div>
      {logout && <LogOutModal />}
    </div>
  );
};
