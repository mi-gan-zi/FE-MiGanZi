import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Pre } from "../../assets/pre.svg";

export const Header = () => {
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();
  const location = window.location.pathname.split("/")[1];
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleTitle = () => {
    if (location === "nickname") {
      setTitle("닉네임 변경");
    }
    if (location === "password") {
      setTitle("비밀번호 변경");
    }
    if (location === "delete") {
      setTitle("회원탈퇴");
    }
    if (location === "myposts") {
      setTitle("내가 쓴 글");
    }
    if (location === "mycommets") {
      setTitle("내가 쓴 댓글");
    }
  };

  useEffect(() => {
    handleTitle();
  }, [location]);

  return (
    <div className="w-full h-[62px] px-4 py-5 flex gap-[10px]">
      <Pre onClick={() => navigate(-1)} className="cursor-pointer"></Pre>
      <p className="text-xl font-semibold">{title}</p>
    </div>
  );
};
