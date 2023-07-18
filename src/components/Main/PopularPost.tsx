import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Popular } from "../../@types/post.type";
import useInterval from "../../hooks/useInterval";

const PopularPost = () => {
  const [popularPost, setPopularPost] = useState<Popular[] | null>(null);
  const showPostArray: any = [""];
  const [showNumber, setShowNumber] = useState(1);
  const START_PAGE = 1;
  const END_PAGE = 5;
  const navigate = useNavigate();

  const getPopularPost = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}user/board/popular-post`
    );
    setPopularPost(response.data);
  };

  useEffect(() => {
    getPopularPost();
  }, []);

  for (const [key, value] of Object.entries(popularPost || "")) {
    showPostArray.push(value);
  }

  useInterval(() => setShowNumber((number) => number + 1), 3000);
  if (showNumber > END_PAGE) {
    setShowNumber(START_PAGE);
  }

  const routePost = (id: number) => {
    navigate(`detail/${String(id)}`);
  };

  return (
    <>
      <div className="text-[20px] h-[70px] border-b-2 flex items-center ml-[40px]">
        유저가 뽑은 베스트 아티클
      </div>
      <div>
        <div className="flex flex-row text-[14px] ml-[40px] h-[21px]">
          <div>{showPostArray[showNumber]?.modifiedDate}</div>
          <div>|</div>
          <div>조회수 {showPostArray[showNumber]?.viewCount}</div>
        </div>
        <div className="flex flex-row ml-[40px] h-[60px]">
          <img
            src="https://storage.googleapis.com/miganzi-bucket/profile_image.png"
            alt="profile"
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="flex items-center ml-[10px]">
            {showPostArray[showNumber]?.nickname}
          </div>
        </div>
        <div className="ml-[40px] mt-[5px] relative">
          <div
            className="absolute top-[0%] bg-st-black w-full h-full opacity-30"
            style={{ background: `linear-gradient(to bottom, black, white)` }}
          />
          <img
            className="object-fill w-[350px] h-[467px] "
            src={showPostArray[showNumber]?.imageUrl}
            alt="postImage"
            onClick={() => routePost(showPostArray[showNumber]?.id)}
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
