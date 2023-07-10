import React from "react";
import PopularPost from "components/Main/PopularPost";
import AllPost from "components/Main/AllPost";

/**
 * @todo Search.tsx에서 Post타입을 참조하는 중 타입을 모은 파일을 따로 만들어야 할듯
 */
export type Post = {
  id: number;
  imageUrl: string;
};

export function Main() {
  return (
    <>
      <>
        <PopularPost />
        <AllPost />
      </>
    </>
  );
}

export default Main;
