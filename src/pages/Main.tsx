import React from "react";
import Layout from "shared/Layout/Layout";

export default function Main() {
  return (
    <>
      <Layout>
        <div className="text-[20px] h-[70px] border-b-2 flex items-center ml-[40px]">
          (유저)가 뽑은 베스트 아티클
        </div>
        <div className="flex flex-row text-[14px] ml-[40px] h-[21px]">
          <div>(may 21)</div>
          <div>|</div>
          <div>(view data)</div>
        </div>
        <div className="flex flex-row ml-[40px] h-[60px]">
          <img
            src="logo192.png"
            alt="profile"
            className="w-[60px] h-[60px]"
          ></img>
          <div className="flex items-center">(유저네임)</div>
        </div>
        <div className="ml-[40px]">
          {/* 이미지 들어갈 곳 - 내부에 지도, 태그, 텍스트 내용 최대 2줄.
          가로방향으로 스크롤 */}
          <img src="logo512.png" alt="img"></img>
        </div>
        <div className="flex justify-center">
          새로 작성된 아티클을 확인해보세요
        </div>
        <div>이미지 가로 3 세로 무한스크롤</div>
      </Layout>
    </>
  );
}
