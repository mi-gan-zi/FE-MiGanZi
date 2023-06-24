import React, { useState } from "react";
import ImageUpLoad from "./ImageUpLoad";
import Player from "components/common/player/Player";
import Head from "./Head";
import Description from "./Description";

export default function Container() {
  const [nextMove, setNextMove] = useState<number>(2);
  // switch (nextMove) {
  //   case 1:
  // }
  return (
    <div className="w-[390px] bg-slate-50 mx-auto flex-col mt-40 bg">
      <>
        <Head />
        {nextMove === 1 ? <Player /> : ""}
        {nextMove === 2 ? <Description /> : ""}
        <ImageUpLoad />
      </>
    </div>
  );
}
