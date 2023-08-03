import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import TagList from "components/TagList";
import MapMark from "components/common/map/MapMark";
import SearchBar from "components/search/SearchBar";
import PostList from "components/search/PostList";
import NoSearchResult from "components/search/NoSearchResult";
import { tagsToBit } from "utils/tagsToBit";
import { ReactComponent as Down } from "../assets/down.svg";
import { ReactComponent as Up } from "../assets/up.svg";
import { Post } from "../@types/post.type";

export default function Search() {
  const [isMapOpen, setIsMapOpen] = useState<boolean>(true);
  const [isTagOpen, setIsTagOpen] = useState<boolean>(false);
  const [keyWord, setKeyWord] = useState<string>("");
  const [lat, setLat] = useState<string | null>(null);
  const [lng, setLng] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const bit = useMemo(() => tagsToBit(tags), [tags]);

  const getSearchList = useCallback(async () => {
    const res = await axios.get(`${process.env.REACT_APP_ENDPOINT}user/board/find-near-post/${lat}/${lng}/${bit}`);
    setPosts(res.data.content);
  }, [lat, lng, bit]);

  useEffect(() => {
    lat && lng && getSearchList();
  }, [getSearchList, lat, lng, tags]);

  const setCoordinate = (y: string, x: string) => {
    setLat(y);
    setLng(x);
  };
  const handleMapToggle = () => {
    setIsMapOpen(!isMapOpen);
  };
  const handleTagToggle = () => {
    setIsTagOpen(!isTagOpen);
  };
  const handleFilterReset = () => {
    // TODO: MapMark 컴포넌트 데이터까지 초기화 필요
    setKeyWord("");
    setLat("");
    setLng("");
    setTags([]);
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
            <SearchBar keyword={keyWord} setKeyword={setKeyWord} />
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
