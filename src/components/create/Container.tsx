import React from "react";
import ImageUpLoad from "./ImageUpLoad";
import MusicSelect from "./Player";
import Head from "./Head";

export default function Container() {
  return (
    <div className="w-[390px] bg-slate-50 mx-auto flex-col mt-40 bg">
      <>
        <Head />
        <MusicSelect />
        <ImageUpLoad />
      </>
    </div>
  );
}
