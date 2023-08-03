import React, { useEffect, useState } from "react";
import createAxiosInstance from "utils/axiosConfig";
import { Header } from "./Header";
import { Post } from "../../@types/post.type";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { ReactComponent as NonImage } from "../../assets/non_image.svg";
import InfinityPost from "components/common/post/InfinityPost";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const MyPosts = () => {
  const [posts, setPosts] = useState<Post[] | null>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [checkLast, setcheckLast] = useState<boolean>();
  const [total, setTotal] = useState<number>(0);
  const axios = createAxiosInstance();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["mypost"],
    queryFn: () => getPosts(),
  });

  async function getPosts() {
    const res = await axios.get(`user/my-page/posts?page=0`);
    setTotal(res.data.postsDto.content.length);
    const newPosts = res.data.postsDto.content;
    setPosts((prevPosts) => Array.from(prevPosts || []).concat(newPosts));
    setPageNumber((prevPage) => prevPage + 1);
    setcheckLast(res.data.postsDto.last);
    return newPosts;
  }

  const target = useIntersectionObserver(async (entry: any, observer: any) => {
    await getPosts().then((result) => {
      setPosts([...result]);
    });
  });

  return (
    <>
      <div>
        <Header />
        <div>
          <div className="px-5">
            <p className="text-st-gray-10 text-base font-medium">
              내가 쓴 글 <span className="text-[#007DF0]">{total}</span>
            </p>
          </div>
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
                <button
                  onClick={() => navigate("create")}
                  className="bg-[#007DF0] rounded-lg px-4 py-[9px] text-st-white"
                >
                  글 작성하기
                </button>
              </div>
            </div>
          )}
          {total !== 0 && (
            <div className="flex flex-wrap flex-column w-[390px] px-3">
              {posts?.map((item) => {
                return (
                  <img
                    src={item.imageUrl}
                    alt="이미지"
                    className="w-[120px] h-[169px] my-[2px] mx-[1px] hover:scale-110 transition-transform ease-in-out duration-500"
                    key={item.id}
                    onClick={() => navigate(`/detail/${item.id}`)}
                  />
                );
              })}
            </div>
          )}
        </div>
        {/* {checkLast ? null : <div ref={target} className="h-[90px]" />} */}
      </div>
    </>
  );
};
