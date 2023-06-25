import React from "react";
import { ReactComponent as Main } from "../../assets/footer_main.svg";
import { ReactComponent as Search } from "../../assets/footer_search.svg";
import { ReactComponent as Upload } from "../../assets/footer_upload.svg";
import { ReactComponent as User } from "../../assets/footer_mypage.svg";

const Footer = () => {
  return (
    <div className="w-full h-[6rem] mt-5 bg-st-gray-02 flex">
      <div className="w-[98px] flex py-[4px] px-[4px] flex-col justify-center items-center">
        <Main />
        <p className="text-st-gray-05 text-sm">메인</p>
      </div>
      <div className="w-[98px] flex py-[4px] px-[4px] flex-col justify-center items-center">
        <Search />
        <p className="text-st-gray-05 text-sm">검색</p>
      </div>
      <div className="w-[98px] flex py-[4px] px-[4px] flex-col justify-center items-center">
        <Upload />
        <p className="text-st-gray-05 text-sm">업로드</p>
      </div>
      <div className="w-[98px] flex py-[4px] px-[4px] flex-col justify-center items-center">
        <User />
        <p className="text-st-gray-05 text-sm">마이페이지</p>
      </div>
    </div>
  );
};

export default Footer;
