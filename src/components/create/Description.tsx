import { PinIcon, WihteSearchIcon } from "assets/Icon";
import UseKeywordMap from "components/common/keyword_map/useKeywordMap";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import DaumPostCode from "react-daum-postcode";
import { Text } from "./Text";
import TagList from "components/TagList";
import { tagsToBit } from "utils/tagsToBit";
type Props = {
  setTagValue: Dispatch<SetStateAction<any>>;
  setMapMarkValue: Dispatch<SetStateAction<any>>;
  setContentValue: Dispatch<SetStateAction<any>>;
  setKeyWord: Dispatch<SetStateAction<string>>;
  mapMarkValue: Object | undefined;
  keyWord: string;
};
export default function Description({
  setTagValue,
  setContentValue,
  setMapMarkValue,
  setKeyWord,
  keyWord,
}: Props) {
  const [isPopUp, setIsPopUp] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [bit, setBit] = useState<string>("000000000000");
  const scrollMapRef = useRef<HTMLDivElement>(null);

  const handleAddress = (data: any) => {
    setKeyWord(data.address);
    setIsPopUp(!isPopUp);
    setTimeout(() => {
      scrollMapRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 500);
  };

  useEffect(() => {
    setBit(tagsToBit(tags));
    setTagValue(bit);
  }, [tags]);
  return (
    <div className="flex flex-col gap-4">
      <div className="py-5">
        <h1 className="font-bold text-xl px-5 pb-5">태그 선택</h1>
        <TagList setTags={setTags} />
      </div>
      <Text setContent={setContentValue} />
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
          <div ref={scrollMapRef}>
            <DaumPostCode onComplete={handleAddress} autoClose />
          </div>
        )}
      </div>
      <UseKeywordMap keyWord={keyWord} setMarkes={setMapMarkValue} />
      {/* <div className="bottom border-t-[1px] border-st-gray-03 flex justify-center h-10 bg-st-gray-08 "> */}
      {/* <button
          className={
            " w-[350px] h-[50px] text-st-white font-bold  mt-2 rounded-md cursor-pointer " +
            (mapMarkValue ? "bg-[#007DF0] " : "bg-st-gray-05")
          }
        >
          다음으로
        </button> */}
      {/* </div> */}
      <div ref={scrollMapRef}></div>
    </div>
  );
}
