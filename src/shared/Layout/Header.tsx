import React from "react";
import { ReactComponent as Pre } from "../../assets/pre.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[4rem] flex items-center justify-between px-5 border-b-2 border-st-gray-03 mb-4">
      <div className="flex">
        <Pre className="cursor-pointer" onClick={() => navigate(-1)}></Pre>
        <p className="translate-x-4">header</p>
      </div>
    </div>
  );
};

export default Header;
