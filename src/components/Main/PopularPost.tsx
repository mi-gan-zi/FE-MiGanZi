import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useInterval from "../../hooks/useInterval";
import { popularPost as ppost } from "services/apis/miganziService";
// import TagList from "components/TagList";
import TagButton from "components/TagButton";
import { tagList } from "../../@types/tag.type";

const PopularPost = () => {
  const START_PAGE = 0;
  const END_PAGE = 4;
  const [showNumber, setShowNumber] = useState(START_PAGE);
  const navigate = useNavigate();
  const [isTag, setIsTag] = useState<string[]>();

  const { data, isLoading } = useQuery({
    queryKey: ["popularPost"],
    queryFn: () => ppost(),
  });

  useInterval(() => setShowNumber((number) => number + 1), 3000);
  if (showNumber > END_PAGE) {
    setShowNumber(START_PAGE);
  }

  const routePost = (id: number | undefined) => {
    if (typeof id === "number") {
      navigate(`detail/${String(id)}`);
    }
  };

  const handleCarousel = (id: number) => {
    setShowNumber(id);
  };

  // const tag = isTag?.filter((item) => item === "0"); // 1로 바꿔야됨
  // console.log(isTag);

  // const position = new Array();
  // let pos = showPostArray[showNumber]?.tags.indexOf("0");
  // while (pos > -1) {
  //   position.push(pos);
  //   pos = showPostArray[showNumber]?.tags.indexOf("0", pos + 1);
  // }
  // console.log(position);

  return (
    <>
      <div className="text-[20px] h-[70px] border-b-2 flex items-center ml-[40px]">
        유저가 뽑은 베스트 아티클
      </div>
      <div>
        <div className="flex flex-row text-[14px] ml-[40px] h-[21px]">
          <div>{data && data[showNumber]?.modifiedDate}</div>
          <div>|</div>
          <div>조회수 {data && data[showNumber]?.viewCount}</div>
        </div>
        <div className="flex flex-row ml-[40px] h-[60px]">
          <img
            src={data && data[showNumber]?.profileImage}
            alt="profile"
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="flex items-center ml-[10px]">
            {data && data[showNumber]?.nickname}
          </div>
        </div>
        <div
          className="ml-[40px] mt-[5px] relative cursor-pointer"
          onClick={() => routePost(data && data[showNumber].id)}
        >
          <div
            className="absolute top-[0%] bg-st-black w-full h-full opacity-30"
            style={{ background: `linear-gradient(to bottom, black, white)` }}
          />
          <img
            className="object-fill w-[350px] h-[467px] "
            src={data && data[showNumber]?.imageUrl}
            alt="postImage"
          />
          <div className="absolute top-[24px] left-[20px] text-cityColor">
            {`🌐 ` + (data && data[showNumber]?.address_name)}
          </div>
          <div className="absolute bottom-[24px] left-[20px] text-cityColor">
            <div>{data && data[showNumber]?.tags}</div>
            <div>{data && data[showNumber]?.content}</div>
          </div>
        </div>
        <div className="flex flex-row justify-center ml-[40px] mt-[7px]">
          {data &&
            data.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={
                    `${
                      index === showNumber
                        ? `postButtonClick`
                        : `postButtonNonClick`
                    }` + " postButton cursor-pointer"
                  }
                  onClick={() => handleCarousel(index)}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
export default PopularPost;
