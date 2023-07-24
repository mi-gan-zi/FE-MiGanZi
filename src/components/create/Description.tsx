import { PinIcon, SearchIcon, WihteSearchIcon } from "assets/Icon";
import UseKeywordMap from "components/common/keyword_map/useKeywordMap";
import { Dispatch, SetStateAction, useState } from "react";
import DaumPostCode from "react-daum-postcode";
import { Text } from "./Text";
import TagList from "components/TagList";
import { MarkType } from "./Container";

export default function Description({
  setMarkes,
  setContent,
  setTags,
}: {
  setMarkes: Dispatch<SetStateAction<MarkType>>;
  setContent: Dispatch<SetStateAction<string>>;
  setTags: Dispatch<SetStateAction<string[]>>;
}) {
  const [keyWord, setKeyWord] = useState("");
  const [isPopUp, setIsPopUp] = useState(false);

  const handleAddress = (data: any) => {
    setKeyWord(data.address);
    setIsPopUp(!isPopUp);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="py-5">
        <h1 className="font-bold text-xl px-5 pb-5">태그 선택</h1>
        <TagList setTags={setTags} />
      </div>
      <Text setContent={setContent} />
      <div className="w-[350px] h-[70px] font-bold text-xl flex items-center px-5">
        <h1>장소 입력</h1>
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
        {isPopUp && (
          <div>
            <DaumPostCode onComplete={handleAddress} autoClose />
          </div>
        )}
      </div>

      <UseKeywordMap keyWord={keyWord} setMarkes={setMarkes} />
      <div className="border-t-[1px] border-st-gray-03 flex justify-center "></div>
    </div>
  );
}
