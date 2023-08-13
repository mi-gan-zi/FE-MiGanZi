import React, { useEffect, useRef, useState } from "react";
import { Header } from "./Header";
import { ReactComponent as NonImage } from "../../assets/non_image.svg";
import createAxiosInstance from "utils/axiosConfig";
import { Post } from "../../@types/post.type";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { AlarmComponent } from "components/common/alarm/AlarmComponet";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { typeOptions } from "@testing-library/user-event/dist/type/typeImplementation";
import { useObserver } from "./UseObserver";
import { group } from "console";

export const MyComents = () => {
  const [total, setTotal] = useState(0);
  const axios = createAxiosInstance();
  const bottom = useRef<HTMLDivElement>(null);
  let checkLast: boolean = false;
  let listLength: any;

  const { data, fetchNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery(["mycomment"], getComments, {
      getNextPageParam: (lastPage) => {
        if (lastPage?.last === false) {
          // listLength = lastPage?.numberOfComments;
          return lastPage.number + 1;
        } else {
          // listLength = lastPage?.numberOfComments;
          checkLast = true;
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    });

  async function getComments({ pageParam }: any) {
    try {
      if (!checkLast) {
        const res = await axios.get(`user/my-page/comments?page=${pageParam}`);
        return res.data;
      }
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  useEffect(() => {
    setTotal(listLength);
  }, [listLength]);

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  // console.log(total);
  console.log(data);
  return (
    <div>
      <Header />
      {/* @ts-ignore */}
      <div className="px-5">
        <div>
          <p className="text-st-gray-10 text-base font-medium">
            내가 쓴 댓글 <span className="text-[#007DF0]">{total}</span>
          </p>
        </div>
        {status === "loading" && <p>...loading</p>}
        {status === "success" && total === 0 && (
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
        {status === "success" &&
          total !== 0 &&
          data?.pages.map((group) =>
            group?.myCommentsDto.content.map((post: any, i: number) => {
              return <AlarmComponent key={i} post={post} />;
            })
          )}
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
        {isFetchingNextPage && <p>...loading</p>}
        <div ref={bottom}></div>
      </div>
    </div>
  );
};
