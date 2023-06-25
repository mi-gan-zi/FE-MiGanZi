import React, { useState } from "react";
import ImageUpLoad from "./ImageUpLoad";
import Head from "./Head";
import Description from "./Description";
import MusicSelect from "./MusicSelect";

export default function Container() {
  const [nextMove, setNextMove] = useState<number>(2);
  const [keyWord, setKeyWord] = useState("");
  // switch (nextMove) {
  //   case 1:
  // }
  return (
    <div className="w-[390px] bg-slate-50 mx-auto flex-col mt-40 bg">
      <>
        <Head />
        {nextMove === 1 && <MusicSelect />}
        {nextMove === 2 && <ImageUpLoad />}
        {nextMove === 3 && <Description />}
      </>
    </div>
  );
}
