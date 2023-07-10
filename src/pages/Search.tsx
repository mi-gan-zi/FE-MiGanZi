import React, { useEffect, useState, useCallback } from "react";
import DaumPostCode from "react-daum-postcode";
import axios from "axios";
import TagList from "components/TagList";
import MapMark from "components/common/map/MapMark";
import PostList from "components/search/PostList";
import NoSearchResult from "components/search/NoSearchResult";
import { ReactComponent as Magnifier } from "../assets/magnifier.svg";
import { ReactComponent as Down } from "../assets/down.svg";
import { ReactComponent as Up } from "../assets/up.svg";
import { Post } from "./Main";

export default function Search() {
  const [isPopUp, setIsPopUp] = useState<boolean>(false);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(true);
  const [isTagOpen, setIsTagOpen] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState<string>("");
  const [lat, setLat] = useState<string | null>(null);
  const [lng, setLng] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [bit, setBit] = useState<string>("000000000000");
  const [posts, setPosts] = useState<Post[]>([]);

  const getSearchList = useCallback(async () => {
    const res = await axios.get(`${process.env.REACT_APP_ENDPOINT}/user/board/find-near-post/${lat}/${lng}/${bit}`);
    setPosts(res.data.content);
  }, [lat, lng, bit]);

  useEffect(() => {
    tagsToBit(tags);
    lat && lng && getSearchList();
  }, [getSearchList, lat, lng, tags]);

  const setCoordinate = (y: string, x: string) => {
    setLat(y);
    setLng(x);
  };
  const tagsToBit = (tags: string[]) => {
    const arr = ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"];
    tags.forEach((index: string) => {
      arr[parseInt(index)] = "1";
    });
    return setBit(arr.join(""));
  };

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
    // TODO: 하위 컴포넌트 데이터까지 초기화 필요
    setKeyWord("");
    setLat("");
    setLng("");
    setTags([]);
    setBit("000000000000");
    setPosts([]);
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
            <div className="z-50 w-[340px] mb-[20px] mx-[20px] px-[16px] py-[8px] flex justify-center items-center border-[1.2px] rounded-full border-[#0f0f0f]">
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
        {posts.length > 0 ? <PostList posts={posts} /> : <NoSearchResult />}
      </section>
    </div>
  );
}
