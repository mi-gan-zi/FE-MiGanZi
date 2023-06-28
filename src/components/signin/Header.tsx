import React, { useEffect, useState } from "react";
import { ReactComponent as Pre } from "../../assets/pre.svg";
import { useNavigate } from "react-router-dom";
import { HeaderIcon } from "assets/Icon";
const Header = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState<string>("");
  const location = window.location.pathname;

  useEffect(() => {
    if (location === "/login") {
      setMsg("로그인");
    } else if (location === "/signup") {
      setMsg("회원가입");
    }
  }, [location]);

  return (
    <div className="w-full flex items-center justify-left px-5 py-2 border-st-gray-03 mb-4">
      <Pre className="cursor-pointer" onClick={() => navigate(-1)}></Pre>
      <p className="translate-x-4 text-xl">{msg}</p>
    </div>
  );
};

export default Header;
