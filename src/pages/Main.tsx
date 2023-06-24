import React from "react";
import Layout from "shared/Layout/Layout";

export default function Main() {
  return (
    <>
      <Layout>
        <div>(유저)가 뽑은 베스트 아티클</div>
        <div>----------</div>
        <div className="flex flex-row">
          <div>(may 21)</div>
          <div>|</div>
          <div>(view data)</div>
        </div>
        <div className="flex flex-row">
          <div>(이미지 들어갈 곳)</div>
          <div>(유저네임)</div>
        </div>
        <div>
          이미지 들어갈 곳 - 내부에 지도, 태그, 텍스트 내용 최대 2줄.
          가로방향으로 스크롤
        </div>
        <div>새로 작성된 아티클을 확인해보세요</div>
        <div>이미지 가로 3 세로 무한스크롤</div>
      </Layout>
    </>
  );
}
