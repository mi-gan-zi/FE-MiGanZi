import React, { useEffect, useState } from "react";
import { ReactComponent as Main } from "../../assets/footer_main.svg";
import { ReactComponent as Search } from "../../assets/footer_search.svg";
import { ReactComponent as Upload } from "../../assets/footer_upload.svg";
import { ReactComponent as User } from "../../assets/footer_mypage.svg";

import { ReactComponent as OnMain } from "../../assets/footer_main_on.svg";
import { ReactComponent as OnSearch } from "../../assets/footer_search_on.svg";
import { ReactComponent as OnUpload } from "../../assets/footer_upload_on.svg";
import { ReactComponent as OnUser } from "../../assets/footer_mypage_on.svg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [onMain, setOnMain] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const [onUpload, setOnUpload] = useState(false);
  const [onUser, setOnUser] = useState(false);
  const [order, setOrder] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (order === 0) {
      setOnMain(true);
      setOnSearch(false);
      setOnUpload(false);
      setOnUser(false);
    } else if (order === 1) {
      setOnMain(false);
      setOnSearch(true);
      setOnUpload(false);
      setOnUser(false);
    } else if (order === 2) {
      setOnMain(false);
      setOnSearch(false);
      setOnUpload(true);
      setOnUser(false);
    } else if (order === 3) {
      setOnMain(false);
      setOnSearch(false);
      setOnUpload(false);
      setOnUser(true);
    }
  }, [order]);

  return (
    <div className="w-full h-[6rem] mt-5 bg-st-gray-02 flex">
      <div
        onClick={() => {
          setOrder(0);
          navigate("/");
        }}
        className="w-[98px] flex py-[4px] px-[4px] flex-col justify-center items-center"
      >
        {onMain ? <OnMain /> : <Main />}
        <p className="text-st-gray-05 text-sm">메인</p>
      </div>
      <div
        onClick={() => {
          setOrder(1);
          navigate("/search");
        }}
        className="w-[98px] flex py-[4px] px-[4px] flex-col justify-center items-center"
      >
        {onSearch ? <OnSearch /> : <Search />}
        <p className="text-st-gray-05 text-sm">검색</p>
      </div>
      <div
        onClick={() => {
          setOrder(2);
          navigate("/create");
        }}
        className="w-[98px] flex py-[4px] px-[4px] flex-col justify-center items-center"
      >
        {onUpload ? <OnUpload /> : <Upload />}
        <p className="text-st-gray-05 text-sm">업로드</p>
      </div>
      <div
        onClick={() => {
          setOrder(3);
          navigate("/login");
        }}
        className="w-[98px] flex py-[4px] px-[4px] flex-col justify-center items-center"
      >
        {onUser ? <OnUser /> : <User />}
        <p className="text-st-gray-05 text-sm">마이페이지</p>
      </div>
    </div>
  );
};

export default Footer;
