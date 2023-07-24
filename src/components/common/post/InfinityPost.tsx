import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { Post } from "../../../@types/post.type";
import createAxiosInstance from "utils/axiosConfig";

/**
 * @param url : 무한스크롤에 사용할 API 주소
 */
export function InfinityPost(props: { url: string }): React.ReactElement {
  const navigate = useNavigate();
  const [post, setPost] = useState<Post[] | null>(null);
  const [page, setPage] = useState(0);
  const [checkLast, setcheckLast] = useState<boolean>();
  const index = props.url.indexOf("=");
  const API_ADDRESS = props.url.substring(0, index + 1);
  const axios = createAxiosInstance();

  const routePost = (id: number) => {
    navigate(`detail/${String(id)}`);
  };

  const getData = async () => {
    try {
      const posts = await axios.get(`${API_ADDRESS}${page}`, {
        headers: {
          Authorization: ``,
        },
      });
      const newPosts = posts.data.content;
      setPost((prevPosts) => Array.from(prevPosts || []).concat(newPosts));
      setPage((prevPage) => prevPage + 1);
      setcheckLast(posts.data.last);
    } catch (e) {
      throw new Error(`getData ERROR! , ${e}`);
    }
  };

  const target = useIntersectionObserver(async (entry: any, observer: any) => {
    await getData();
  });

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
                  className="w-[126px] h-[169px] my-[2px] mx-[2px] hover:scale-110 transition-transform ease-in-out duration-500 cursor-pointer"
                  key={item.id}
                  onClick={() => routePost(item.id)}
                />
              );
            })
          : null}
      </div>
      {checkLast ? null : <div ref={target} className="h-[90px]" />}
    </>
  );
}

export default InfinityPost;
