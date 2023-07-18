import React, { Dispatch, SetStateAction } from "react";
import { ReactComponent as Pre } from "../../assets/pre.svg";

export type NextProps = {
  setNextMove: Dispatch<SetStateAction<number>>;
  image: boolean;
  testMapDataHandle: (e: any) => Promise<void>;
  nextMove:number
};

export default function Head({ setNextMove, image, testMapDataHandle, nextMove }: NextProps) {
  const onClickNextButton = (e:any) => {
    if (image) {
      alert("사진을 업로드 해주세요!");
    } else {
      setNextMove((pre) => pre + 1);
    }
    if(nextMove >= 3){
      testMapDataHandle(e)
    }
  };
  return (
    <div className="w-full pb-4 flex items-center justify-between px-5 border-b-[1px] border-st-gray-03 sticky top-[0px] bg-st-white">
      <div className="flex">
        <Pre
          onClick={() => setNextMove((pre) => pre - 1)}
          className="cursor-pointer"
        ></Pre>
        <p className="translate-x-4 font-bold">게시글 작성</p>
      </div>
      <div>
        <button onClick={onClickNextButton}>다음</button>
      </div>
    </div>
  );
}
