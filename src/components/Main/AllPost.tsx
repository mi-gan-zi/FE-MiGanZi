import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Post } from "../../@types/post.type";

/**
 * @todo 자동으로 캐러셀 넘어가도록, 버튼 지우기
 */

export function AllPost() {
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

  const routePost = (id: number) => {
    navigate(`detail/${String(id)}`);
  };

  return (
    <>
      <div className="flex justify-center text-[20px] h-[70px] items-center">
        새로 작성된 아티클을 확인해보세요
      </div>
      <div className="flex flex-wrap flex-column w-[390px]">
        {post
          ? post.map((item) => {
              return (
                <img
                  src={item.imageUrl}
                  alt="이미지"
                  className="w-[120px] h-[169px] my-[2px] mx-[1px] hover:scale-110 transition-transform ease-in-out duration-500"
                  key={item.id}
                  onClick={() => routePost(item.id)}
                />
              );
            })
          : null}
      </div>
      <div ref={ref} className="h-[90px]" />
    </>
  );
}

export default AllPost;
