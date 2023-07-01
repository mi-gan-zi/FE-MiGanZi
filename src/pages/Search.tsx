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

export default function Search() {
  const [isPopUp, setIsPopUp] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [keyWord, setKeyWord] = useState("");
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  const tags = "000000000000";

  const [posts, setPosts] = useState<Post[]>([]);

  const setQueries = (y: number, x: number) => {
    setLat(y);
    setLng(x);
    setLat(37.315);
    setLng(126.83);
  };

  const navigate = useNavigate();
  const serverURL = `https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/user/board/find-near-post`;

  useEffect(() => {
    axios
      .get(`${serverURL}/37.315/126.83/${tags}`) // ${lat}/${lng}/${tags}
      .then((res) => {
        console.log("응답: " + res.data.content);
        setPosts(res.data.content);
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  }, [serverURL, lat, lng, tags]);

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
    // TODO: 태그도 초기화 필요
    setKeyWord("");
  };

  return (
    <div className="w-full flex flex-col justify-center content-center">
      <section className="bg-white border-b-2 border-[#F5F4F3]">
        <div className="w-[350px] m-[20px] px-[16px] py-[8px] flex justify-center items-center border-[1.2px] rounded-full border-[#0f0f0f]">
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
      </section>
      <section className="bg-white border-b-2 border-[#F5F4F3]">
        <div className="py-[20px] flex justify-between items-center">
          <p className="px-[20px] text-xl font-bold">지도 탐색하기</p>
          <button className="px-[20px]" onClick={handleMapToggle}>
            {!isMapOpen ? <Down /> : <Up />}
          </button>
        </div>
        {isMapOpen && <MapMark setQueries={setQueries} />}
      </section>
      <section className="bg-white border-b-2 border-[#F5F4F3]">
        <div className="py-[20px] flex justify-between items-center">
          <p className="px-[20px] text-xl font-bold">장소 태그</p>
          <button className="px-[20px]" onClick={handleTagToggle}>
            {!isTagOpen ? <Down /> : <Up />}
          </button>
        </div>
        {isTagOpen ? <TagList /> : ""}
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
