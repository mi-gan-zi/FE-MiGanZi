import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxiosInstance from "utils/axiosConfig";
import { ConfirmModal } from "./ConfirmModal";
import { FinalModal } from "./FinalModal";
import { Header } from "./Header";

export const DeleteUser = () => {
  const [modal, setModal] = useState(true);
  const [finalModal, setFinalModal] = useState(false);
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");
  const axios = createAxiosInstance();
  const nickname_ref = useRef<HTMLInputElement>(null);

  const DeleteButtonHandler = () => {
    try {
      const checkNickName = nickname_ref.current?.value;
      const formData = new FormData();
      checkNickName && formData.append("checkNickname", checkNickName);
      const res = axios.post("user/withdrawal", formData);
      console.log(res);
      localStorage.clear();
      localStorage.removeItem("token");
      localStorage.removeItem("refresh-token");
      localStorage.removeItem("nickname");
      localStorage.removeItem("expire_time");

      setFinalModal(true);
      navigate("/");
    } catch (err) {
      alert("닉네임을 다시 작성해주세요.");
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="px-5">
        <div className="py-5 text-xl font-bold">{nickname}님</div>
        <div>
          <p className="text-[#8B8B8B] text-base font-semibold mt-[10px]">
            탈퇴를 위해서, 가입하신 닉네임을 입력해주세요.
          </p>
          <input
            ref={nickname_ref}
            className="w-[350px] py-[10px] px-3 mt-[10px] rounded border border-st-gray-05"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => setModal(true)}
            className="w-[350px] h-[50px] translate-y-[400px] px-4 py-[13px] rounded-lg bg-[#007DF0] text-st-white"
          >
            탈퇴하기
          </button>
          {modal && (
            <ConfirmModal
              setModal={setModal}
              DeleteButtonHandler={DeleteButtonHandler}
            />
          )}
          {finalModal && <FinalModal setFinalModal={setFinalModal} />}
        </div>
      </div>
    </div>
  );
};
