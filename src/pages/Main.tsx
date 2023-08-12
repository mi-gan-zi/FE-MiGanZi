import React from "react";
import PopularPost from "components/Main/PopularPost";
import AllPost from "components/Main/AllPost";
import HeaderComponent from "components/Main/HeaderComponent";

export type Post = {
  id: number;
  imageUrl: string;
};

export function Main() {
  return (
    <>
      <HeaderComponent />
      <PopularPost />
      <AllPost />
    </>
  );
}

export default Main;
