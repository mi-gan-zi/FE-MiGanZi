import React, { useEffect, useState } from "react";
import createAxiosInstance from "utils/axiosConfig";
import { Header } from "./Header";
import { Post } from "../../@types/post.type";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

export const MyPosts = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const axios = createAxiosInstance();

  const getPosts = async () => {
    const res = await axios.get(`ser/my-page/posts?page=${page}`);
    console.log(res);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Header />
      <div className="px-5">
        <p className="text-st-gray-10 text-base font-medium">
          내가 쓴 글 <span className="text-[#007DF0]">{total}</span>
        </p>
      </div>
    </div>
  );
};
