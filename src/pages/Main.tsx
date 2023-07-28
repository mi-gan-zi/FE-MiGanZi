import React from "react";
import PopularPost from "components/Main/PopularPost";
import AllPost from "components/Main/AllPost";

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
