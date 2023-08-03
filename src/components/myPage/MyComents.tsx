import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { ReactComponent as NonImage } from "../../assets/non_image.svg";
import createAxiosInstance from "utils/axiosConfig";
import { Post } from "../../@types/post.type";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { AlarmComponent } from "components/common/alarm/AlarmComponet";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const MyComents = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const axios = createAxiosInstance();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [checkLast, setcheckLast] = useState<boolean>();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["mycomment"],
    queryFn: () => getComments(),
  });

  const getComments = async () => {
    const res = await axios.get(`user/my-page/comments?page=0`);
    setTotal(res.data.myCommentsDto.content.length);
    const newPosts = res.data.myCommentsDto.content;
    setPosts((prevPosts) => Array.from(prevPosts || []).concat(newPosts));
    setPageNumber((prevPage) => prevPage + 1);
    setcheckLast(res.data.myCommentsDto.last);
  };

  const target = useIntersectionObserver(async (entry: any, observer: any) => {
    await getComments();
  });

  return (
    <div>
      <Header />
      <div className="px-5">
        <div>
          <p className="text-st-gray-10 text-base font-medium">
            내가 쓴 댓글 <span className="text-[#007DF0]">{total}</span>
          </p>
        </div>
        {total === 0 && (
          <div className="w-full h-[560px] flex flex-col items-center justify-center">
            <NonImage />
            <div className="h-[75px] flex flex-col items-center justify-between">
              <p className="text-st-gray-08 text-lg font-semibold">
                작성한 댓글이 없어요.
              </p>
              <p className="text-st-gray-06 text-base font-medium">
                다양한 게시물에 대한 감상평을 남겨주세요.
              </p>
            </div>
          </div>
        )}
        {total !== 0 &&
          posts?.map((post: any) => <AlarmComponent post={post} />)}
      </div>
    </div>
  );
};
