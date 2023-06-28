import { PinIcon, SearchIcon, WihteSearchIcon } from "assets/Icon";
import UseKeywordMap from "components/common/keyword_map/useKeywordMap";
import { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import { Text } from "./Text";
import TagList from "components/TagList";
import axios from "axios";
interface MarkType {
  lat: string;
  lng: string;
}
export default function Description() {
  const [keyWord, setKeyWord] = useState("");
  const [isPopUp, setIsPopUp] = useState(false);
  const [mark, setMarkes] = useState<MarkType>();
  console.log(mark);
  const handleAddress = (data: any) => {
    setKeyWord(data.address);
    console.log(data);
    setIsPopUp(!isPopUp);
  };
  console.log(mark?.lat);
  const testMapDataHandle = async () => {
    const testPostData = {
      address_name: keyWord,
      lat: mark?.lat,
      lng: mark?.lng,
    };
    try {
      const res = await axios.post(
        process.env.REACT_APP_ENDPOINT + "user/board/post",
        testPostData
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="py-5">
        <h1 className="font-bold text-xl px-5 pb-5">태그 선택</h1>
        <TagList />
      </div>
      <Text />
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
      </div>
      {isPopUp && (
        <div>
          <DaumPostCode onComplete={handleAddress} autoClose />
        </div>
      )}

      {/* <div className="flex">{useKeywordMap({ keyWord })}</div> */}
      <UseKeywordMap keyWord={keyWord} setMarkes={setMarkes} />
      <div className="border-t-[1px] border-st-gray-03 flex justify-center ">
        <button
          className={
            " w-[350px] h-[50px] text-st-white font-bold  mt-2 rounded-md " +
            (keyWord ? "bg-[#007DF0] " : "bg-st-gray-05")
          }
          onClick={testMapDataHandle}
          // disabled
        >
          다음으로
        </button>
      </div>
    </div>
  );
}
