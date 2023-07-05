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
  const showPostArray: any = [""];
  const [showNumber, setShowNumber] = useState(1);

  const getPopularPost = async () => {
    const response = await axios.get(
      `https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/user/board/popular-post`
    );
    setPopularPost(response.data);
  };

  useEffect(() => {
    getPopularPost();
  }, []);

  for (const [key, value] of Object.entries(popularPost || "")) {
    showPostArray.push(value);
  }

  console.log(showPostArray);

  return (
    <>
      <div>
        <div className="flex flex-row text-[14px] ml-[40px] h-[21px]">
          <div>{showPostArray[showNumber]?.modifiedDate}</div>
          <div>|</div>
          <div>조회수 {showPostArray[showNumber]?.viewCount}</div>
        </div>
        <div className="flex flex-row ml-[40px] h-[60px]">
          <img
            src="street1.jpg"
            alt="profile"
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="flex items-center ml-[10px]">
            {showPostArray[showNumber]?.nickname}
          </div>
        </div>
        <div className="ml-[40px] mt-[5px] relative">
          <img
            className="object-fill w-[350px] h-[467px]"
            src={showPostArray[showNumber]?.imageUrl}
            alt="postImage"
          />
          <div className="absolute top-[24px] left-[20px] text-cityColor">
            {`🌐 ` + showPostArray[showNumber]?.address_name}
          </div>
          <div className="absolute bottom-[24px] left-[20px] text-cityColor">
            <div>{showPostArray[showNumber]?.tags}</div>
            <div>{showPostArray[showNumber]?.content}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PopularPost;
