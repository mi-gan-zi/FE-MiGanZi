import axios from "axios";
import React, { useEffect, useState } from "react";

export type Popular = {
  address_name: string;
  content: string;
  id: number;
  imageUrl: string;
  modifiedDate: string;
  nickname: string;
  tags: string;
  viewCount: number;
};

const PopularPost = () => {
  const [popularPost, setPopularPost] = useState<Popular[] | null>(null);

  const getPopularPost = async () => {
    const response = await axios.get(
      `https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/user/board/popular-post`
    );
    setPopularPost(response.data);
  };

  console.log(popularPost);

  useEffect(() => {
    getPopularPost();
  }, []);

  return (
    <>
      {popularPost
        ? popularPost.map((item) => {
            return (
              <>
                <div className="flex flex-row text-[14px] ml-[40px] h-[21px]">
                  <div>{item.modifiedDate}</div>
                  <div>|</div>
                  <div>조회수 {item.viewCount}</div>
                </div>
                <div className="flex flex-row ml-[40px] h-[60px]">
                  <img
                    src="street1.jpg"
                    alt="profile"
                    className="w-[60px] h-[60px] rounded-full"
                  ></img>
                  <div className="flex items-center ml-[10px]">
                    {item.nickname}
                  </div>
                </div>
                <div className="ml-[40px] w-[350px] h-[467px]">
                  <img src={item.imageUrl} alt="img" />
                </div>
              </>
            );
          })
        : null}
    </>
  );
};
export default PopularPost;
