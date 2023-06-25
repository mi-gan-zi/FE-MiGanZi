import React, { useEffect, useState } from "react";
import ImageUpLoad from "./ImageUpLoad";
import Head from "./Head";
import Description from "./Description";
import MusicSelect from "./MusicSelect";

export default function Container() {
  const [nextMove, setNextMove] = useState<number>(1);
  const [keyWord, setKeyWord] = useState("");
  // switch (nextMove) {
  //   case 1:
  // }

  useEffect(() => {
    if (nextMove < 1) {
      setNextMove(1);
    } else if (nextMove > 3) {
      setNextMove(3);
    }
  }, [nextMove]);
  return (
    <>
      <Head setNextMove={setNextMove} />
      {nextMove === 1 && <MusicSelect />}
      {nextMove === 2 && <ImageUpLoad />}
      {nextMove === 3 && <Description />}
    </>
  );
}
