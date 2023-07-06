import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostCode from "react-daum-postcode";
import axios from "axios";
import TagList from "components/TagList";
import MapMark from "components/common/map/MapMark";
import { Post } from "./Main";
import { ReactComponent as Magnifier } from "../assets/magnifier.svg";
import { ReactComponent as Down } from "../assets/down.svg";
import { ReactComponent as Up } from "../assets/up.svg";
import result from "../assets/no_result.svg";

// const tagsToBit = (tags: string[]) => {
//   const arr = Array(12).fill(0);
//   for (let i = 0; i < tags.length; i++) {
//     arr[Number(tags[i])] = 1;
//   }
//   return arr.join("");
// };
export default function Search() {
  const [isPopUp, setIsPopUp] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(true);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [lat, setLat] = useState<string>();
  const [lng, setLng] = useState<string>();
  const [tags, setTags] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // let bit = "";
  // bit = tagsToBit(tags);

  const setCoordinate = (y: string, x: string) => {
    setLat(y);
    setLng(x);
  };

  const navigate = useNavigate();
  const serverURL = `https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/user/board/find-near-post`;

  useEffect(() => {
    lat &&
      axios
        .get(`${serverURL}/${lat}/${lng}/000000000000`) // /37.315/126.83/000000000000
        .then((res) => {
          // console.log("응답: " + res.data.content);
          setPosts(res.data.content);
        });
    // .catch((err) => {
    //   console.error(err);
    //   return;
    // });
  }, [serverURL, lat, lng]);

  const handleInput = (e: React.MouseEvent) => {
    setIsPopUp(!isPopUp);
    setKeyWord("");
  };
  const handleAddress = (data: any) => {
    setKeyWord(data.address);
  };
  const handleMapToggle = () => {
    setIsMapOpen(!isMapOpen);
  };
  const handleTagToggle = () => {
    setIsTagOpen(!isTagOpen);
  };
  const handleFilterReset = () => {
    setKeyWord("");
    setTags([]);
  };

  return (
    <div className="w-full flex flex-col justify-center content-center">
      <section className="bg-white border-b-2 border-[#F5F4F3]">
        <div className="py-[20px] flex justify-between items-center">
          <p className="px-[20px] text-xl font-bold">지도 탐색하기</p>
          <button className="px-[20px]" onClick={handleMapToggle}>
            {!isMapOpen ? <Down /> : <Up />}
          </button>
        </div>
        {isMapOpen && (
          <div className="bg-white border-b-2 border-[#F5F4F3]">
            <div className="z-50 w-[340px] m-[20px] px-[16px] py-[8px] flex justify-center items-center border-[1.2px] rounded-full border-[#0f0f0f]">
              <Magnifier />
              <input
                type="search"
                placeholder="도로명 주소 검색"
                className="w-full ml-2.5 font-medium focus:outline-none"
                onClick={handleInput}
                value={keyWord}
              />
            </div>
            {isPopUp && (
              <div className="px-[20px]">
                <DaumPostCode onComplete={handleAddress} autoClose />
              </div>
            )}
            <MapMark keyword={keyWord} setCoordinate={setCoordinate} />
          </div>
        )}
      </section>
      <section className="bg-white border-b-2 border-[#F5F4F3]">
        <div className="py-[20px] flex justify-between items-center">
          <p className="px-[20px] text-xl font-bold">장소 태그</p>
          <button className="px-[20px]" onClick={handleTagToggle}>
            {!isTagOpen ? <Down /> : <Up />}
          </button>
        </div>
        {isTagOpen ? <TagList setTags={setTags} /> : ""}
      </section>
      <section className="bg-white border-[#F5F4F3]">
        <div className="py-[20px] flex justify-between items-center">
          <p className="px-[20px] text-xl font-bold">아티클 둘러보기</p>
          <button className="px-[20px] text-sm font-medium text-[#F22222]" onClick={handleFilterReset}>
            필터 초기화
          </button>
        </div>
        {posts.length > 0 ? (
          <div className="w-[390px] flex flex-wrap flex-column ">
            {posts.map((item) => {
              return (
                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-[120px] h-[169px] my-[2px] mx-[1px]"
                  key={item.id}
                  onClick={() => navigate(`/detail/${item.id}`)}
                />
              );
            })}
          </div>
        ) : (
          <div className="mb-[6rem] py-[20px] flex flex-col justify-center items-center">
            <img alt="" src={result} />
            <p className="text-lg font-semibold text-[#3D3D3D]">검색 값에 맞는 아티클이 없어요.</p>
            <p className="mt-6 text-[#8B8B8B]">다른 키워드를 검색해보거나,</p>
            <p className="mb-6 text-[#8B8B8B]">필터 초기화를 통해 미(간)지를 탐색해보세요.</p>
          </div>
        )}
      </section>
    </div>
  );
}
