import React from "react";

export default function Player() {
  return (
    <div className="bg-yellow-300 flex justify-end">
      <div className="bg-[#F5F4F3] w-[370px] h-[157px] rounded-l-xl ">
        <article className="left_box">
          <div className="description">
            <p>song</p>
            <p>artist</p>
            <p className="thin">01:02</p>
          </div>
          <div className="button_box">
            <div className="border-[#007DF0] border-[1px] w-[40px] h-[40px] rounded-full flex items-center justify-center">
              <div className="bg-[#007DF0] w-[16px] h-[16px] "></div>
            </div>
            <div className="rounded-full bg-[#007DF0] w-[40px] h-[40px] flex items-center justify-center">
              <div className="border-b-[10px] border-t-[10px] border-r-0 border-l-[16px] ml-1 border-solid border-b-transparent border-t-transparent border-r-transparent border-l-white w-0 h-0"></div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
