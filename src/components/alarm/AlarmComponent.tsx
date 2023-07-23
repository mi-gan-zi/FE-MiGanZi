import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Pre } from "../../assets/pre.svg";

export const AlarmPost = () => {
  const navigate = useNavigate();
  return (
    <div className="px-5">
      <div className="w-full h-[62px] px-4 py-5 flex gap-[10px] border-b-2 border-st-gray-03">
        <Pre onClick={() => navigate(-1)} className="cursor-pointer"></Pre>
        <p className="text-xl font-semibold">알림</p>
      </div>
    </div>
  );
};
