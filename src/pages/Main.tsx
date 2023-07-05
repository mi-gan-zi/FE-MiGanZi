import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopularPost from "components/Main/PopularPost";

export type Post = {
  id: number;
  imageUrl: string;
};

export function Main() {
  const navigate = useNavigate();
  const [post, setPost] = useState<Post[] | null>(null);
  const ref = useRef(null);
  const [page, setPage] = useState(0);
  const [checkLast, setcheckLast] = useState<boolean>();

  const getBoards = async (pageNumber: number) => {
    const posts = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}user/board/posts?page=${pageNumber}`
    );
    const newPosts = posts.data.content;
    setPost((prevPosts) => Array.from(prevPosts || []).concat(newPosts));
    setPage((prevPage) => prevPage + 1);

    setcheckLast(posts.data.last);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!checkLast) {
            getBoards(page);
          }
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [page]);

  const routePost = () => {};
  return (
    <>
      <>
        <div className="text-[20px] h-[70px] border-b-2 flex items-center ml-[40px]">
          유저가 뽑은 베스트 아티클
        </div>
        <PopularPost />

        <div className="flex justify-center text-[20px] h-[70px] items-center">
          새로 작성된 아티클을 확인해보세요
        </div>
        <div
          onClick={() => navigate("/detail")}
          className="flex flex-wrap flex-column w-[390px]"
        >
          {post
            ? post.map((item) => {
                return (
                  <img
                    src={item.imageUrl}
                    alt="이미지"
                    className="w-[120px] h-[169px] my-[2px] mx-[1px]"
                    key={item.id}
                    // onClick = {test(item.id)} 클릭 시 해당 게시글로 라우팅하는 함수
                  />
                );
              })
            : null}
        </div>
        <div ref={ref} className="h-[90px]" />
      </>
    </>
  );
}

export default Main;
