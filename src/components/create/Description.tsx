import { PinIcon, SearchIcon, WihteSearchIcon } from "assets/Icon";
import useKeywordMap from "components/common/keyword_map/useKeywordMap";
import { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import { Text } from "./Text";

export default function Description() {
  const [keyWord, setKeyWord] = useState("");
  const [isPopUp, setIsPopUp] = useState(false);
  const handleAddress = (data: any) => {
    setKeyWord(data.address);
    setIsPopUp(!isPopUp);
  };
  return (
    <div className="flex flex-col gap-4">
      <Text />
      <div className="w-[350px] h-[70px] font-bold text-xl flex items-center px-5">
        <h1>장소 설명 입력</h1>
      </div>
      <div className="input-box">
        <div
          className={
            "w-[350px] h-[42px]  rounded-md mx-auto flex items-center px-3 gap-2 shadow-st-gray-07 justify-center " +
            (keyWord
              ? "bg-st-white border-st-gray-05 border-[1px] text-st-gray-07"
              : "bg-[#007DF0]")
          }
          onClick={handleAddress}
        >
          {keyWord ? <PinIcon /> : <WihteSearchIcon />}
          {keyWord ? (
            keyWord
          ) : (
            <p className="text-st-white flex justify-center items-center cursor-pointer">
              장소 입력하기
            </p>
          )}
        </div>
      </div>
      {isPopUp && (
        <div>
          <DaumPostCode onComplete={handleAddress} autoClose />
        </div>
      )}
      <div className="flex">{useKeywordMap({ keyWord })}</div>
      <div className="border-t-[1px] border-st-gray-03 flex justify-center ">
        <button
          className={
            " w-[350px] h-[50px] text-st-white font-bold  mt-2 rounded-md " +
            (keyWord ? "bg-[#007DF0] " : "bg-st-gray-05")
          }
          disabled
        >
          다음으로
        </button>
      </div>
    </div>
  );
}
