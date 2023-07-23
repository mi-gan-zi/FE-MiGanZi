import React, { useEffect, useState } from "react";
import createAxiosInstance from "utils/axiosConfig";
import { Header } from "./Header";
import { Post } from "../../@types/post.type";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { ReactComponent as NonImage } from "../../assets/non_image.svg";
import { useUser } from "context/userContext";

export const MyPosts = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [checkLast, setcheckLast] = useState<boolean>();
  const [total, setTotal] = useState<number>(0);
  const axios = createAxiosInstance();
  // const { userData, hasPageNum } = useUser();

  const getPosts = async () => {
    const res = await axios.get(`user/my-page/posts?page=${pageNumber}`);
    console.log(res);
    setTotal(res.data.numberOfPosts);
    const newPosts = res.data.postsDto.content;
    setPosts((prevPosts) => Array.from(prevPosts || []).concat(newPosts));
    setPageNumber((prevPage) => prevPage + 1);
    setcheckLast(res.data.postsDto.last);
  };

  useEffect(() => {
    getPosts();
    // hasPageNum(pageNumber);
  }, []);

  // console.log(userData);
  const target = useIntersectionObserver(async (entry: any, observer: any) => {
    await getPosts();
  });

  return (
    <div>
      <Header />
      <div className="px-5">
        <p className="text-st-gray-10 text-base font-medium">
          내가 쓴 글 <span className="text-[#007DF0]">{total}</span>
        </p>
        {total === 0 && (
          <div className="w-full h-[560px] flex flex-col items-center justify-center">
            <NonImage />
            <div className="h-[125px] flex flex-col items-center justify-between">
              <p className="text-st-gray-08 text-lg font-semibold">
                작성한 글이 없어요.
              </p>
              <p className="text-st-gray-06 text-base font-medium">
                당신만의 장소를 기록해보세요
              </p>
              <button className="bg-[#007DF0] rounded-lg px-4 py-[9px] text-st-white">
                글 작성하기
              </button>
            </div>
          </div>
        )}
        {checkLast ? null : <div ref={target} className="h-[90px]" />}
      </div>
    </div>
  );
};
