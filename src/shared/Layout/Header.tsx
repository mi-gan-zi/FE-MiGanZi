import React from "react";
import { ReactComponent as Pre } from "../../assets/pre.svg";
import { useNavigate } from "react-router-dom";
import { HeaderIcon } from "assets/Icon";
const Header = () => {
  const navigate = useNavigate();
  const currentTime = new Date().toTimeString().split(" ")[0].slice(0, 5);
  console.log(currentTime);
  return (
    <div className="w-full  flex items-center justify-between px-5 py-2 border-st-gray-03 mb-4">
      <div className="time text-[14px] font-bold ">{currentTime}</div>
      <div>
        <HeaderIcon />
      </div>
      {/* <Pre className="cursor-pointer" onClick={() => navigate(-1)}></Pre> */}
      {/* <p className="translate-x-4">header</p> */}
    </div>
  );
};

export default Header;
