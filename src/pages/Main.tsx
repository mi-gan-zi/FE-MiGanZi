import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "shared/Layout/Layout";

interface Iinfo {
  commentCount: number;
  content: string;
  createdDate: Date;
  id: number;
  imageUrl: string;
  modifiedDate: Date;
  nickname: string;
  title: string;
  userComments?: string[];
  viewCount: number;
}

export default function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    const getBoards = async () => {
      const posts = await axios.get(
        `https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/user/board/`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TESTAUTH}`,
          },
        }
      );
      console.log(posts.data);
    };
    getBoards();
  }, []);

  return (
    <>
      <>
        <div className="text-[20px] h-[70px] border-b-2 flex items-center ml-[40px]">
          유저가 뽑은 베스트 아티클
        </div>
        <div className="flex flex-row text-[14px] ml-[40px] h-[21px]">
          <div>JUNE 26</div>
          <div>|</div>
          <div>조회수 26</div>
        </div>
        <div className="flex flex-row ml-[40px] h-[60px]">
          <img
            src="street1.jpg"
            alt="profile"
            className="w-[60px] h-[60px] rounded-full"
          ></img>
          <div className="flex items-center ml-[10px]">Miganzi</div>
        </div>
        <div className="ml-[40px] w-[350px] h-[467px]">
          {/* 이미지 들어갈 곳 - 내부에 지도, 태그, 텍스트 내용 최대 2줄.
          가로방향으로 스크롤 */}
          <img src="logo512.png" alt="img"></img>
        </div>
        <div className="flex justify-center text-[20px] h-[70px] items-center">
          새로 작성된 아티클을 확인해보세요
        </div>
        <div
          onClick={() => navigate("/detail")}
          className="flex flex-row w-[390px] mb-[5px] justify-evenly"
        >
          <img
            className="w-[126px] h-[169px]"
            src="street1.jpg"
            alt="img"
          ></img>
          <img
            className="w-[126px] h-[169px]"
            src="street2.jpg"
            alt="img"
          ></img>
          <img
            className="w-[126px] h-[169px]"
            src="street3.jpg"
            alt="img"
          ></img>
        </div>
        <div
          onClick={() => navigate("/detail")}
          className="flex flex-row w-[390px] mb-[5px] justify-evenly"
        >
          <img
            className="w-[126px] h-[169px]"
            src="street4.jpg"
            alt="img"
          ></img>
          <img
            className="w-[126px] h-[169px]"
            src="street5.jpg"
            alt="img"
          ></img>
          <img
            className="w-[126px] h-[169px]"
            src="street6.jpg"
            alt="img"
          ></img>
        </div>
      </>
    </>
  );
}
