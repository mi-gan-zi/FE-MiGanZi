import React, { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import { ReactComponent as Magnifier } from "../../assets/magnifier.svg";

export default function SearchBar({
  keyword,
  setKeyword,
}: {
  keyword: string;
  setKeyword: (data: string) => void;
}) {
  const [isPopUp, setIsPopUp] = useState<boolean>(false);

  const handleSearchBar = (e: React.MouseEvent) => {
    setIsPopUp(!isPopUp);
    setKeyword("");
  };

  const handleInputAddress = (data: any) => {
    setKeyword(data.address);
  };

  return (
    <>
      <div className="z-50 w-[340px] mb-[20px] mx-[20px] px-[16px] py-[8px] flex justify-center items-center border-[1.2px] rounded-full border-[#0f0f0f]">
        <Magnifier />
        {/* FIXME: input의 onClick -> onChange 관련 에러 해결 필요 */}
        <input
          type="search"
          placeholder="도로명 주소 검색"
          className="w-full ml-2.5 font-medium focus:outline-none"
          onClick={handleSearchBar}
          value={keyword}
        />
      </div>
      {isPopUp && (
        <div className="px-[20px]">
          <DaumPostCode onComplete={handleInputAddress} autoClose />
        </div>
      )}
    </>
  );
}
