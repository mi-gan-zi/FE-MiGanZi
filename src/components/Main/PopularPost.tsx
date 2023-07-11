import React, { useEffect, useState } from "react";
import axios from "axios";
import { Popular } from "../../@types/post.type";

/**
 * @todo 디자인 투두
 * 1. 이미지 태그 위에 linear gradient 추가하기  리니어 : 30퍼
 */

const PopularPost = () => {
  const [popularPost, setPopularPost] = useState<Popular[] | null>(null);
  const showPostArray: any = [""];
  const [showNumber, setShowNumber] = useState(1);
  const START_PAGE = 0;
  const END_PAGE = 5;

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

  const changeImage = (props: string) => {
    if (props === "prev") {
      if (showNumber === 1) setShowNumber(END_PAGE);
      setShowNumber((number) => number - 1);
    } else {
      if (showNumber === END_PAGE) setShowNumber(START_PAGE);
      setShowNumber((number) => number + 1);
    }
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
            src="street1.jpg"
            alt="profile"
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="flex items-center ml-[10px]">
            {showPostArray[showNumber]?.nickname}
          </div>
        </div>
        <div className="ml-[40px] mt-[5px] relative">
          <div className="absolute top-[0%] bg-st-black w-full h-[80px] opacity-70" />
          <div className="absolute bottom-[0%] bg-st-black w-full h-[80px] opacity-70" />
          <img
            className="object-fill w-[350px] h-[467px] "
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
          <button
            className="absolute top-[45%] p-[5px] text-2xl text-cityColor"
            onClick={() => changeImage("prev")}
          >
            &lt;
          </button>
          <button
            className="absolute top-[45%] p-[5px] right-[0px] text-2xl text-cityColor"
            onClick={() => changeImage("post")}
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
};
export default PopularPost;
