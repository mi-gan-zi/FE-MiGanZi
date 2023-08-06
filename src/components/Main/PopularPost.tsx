import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPopular } from "../../@types/post.type";
import useInterval from "../../hooks/useInterval";
import createAxiosInstance from "utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { getPopularPostService } from "services/apis/miganziService";
import { tagList } from "../../@types/tag.type";

const PopularPost = () => {
  const START_PAGE = 0;
  const END_PAGE = 4;
  const showPostArray: IPopular[] = [];
  const [popularPost, setPopularPost] = useState<IPopular[] | null>(null);
  const [showNumber, setShowNumber] = useState(START_PAGE);
  const navigate = useNavigate();
  const axios = createAxiosInstance();

  const { data } = useQuery({
    queryKey: ["popularPost"],
    queryFn: () => getPopularPostService(),
  });

  const getPopularPost = async () => {
    try {
      const response = await axios.get(`user/board/popular-post`, {
        headers: {
          Authorization: ``,
        },
      });
      setPopularPost(response.data);
    } catch (e) {
      throw new Error(`Popular post ERROR ! , ${e}`);
    }
  };

  useEffect(() => {
    getPopularPost();
  }, []);

  useInterval(() => setShowNumber((number) => number + 1), 3000);

  for (const [key, value] of Object.entries(popularPost || "")) {
    showPostArray.push(value);
  }

  if (showNumber > END_PAGE) {
    setShowNumber(START_PAGE);
  }

  const routePost = () => {
    const id = data && data[showNumber]?.id;
    navigate(`detail/${String(id)}`);
  };

  const handleCarousel = (id: number) => {
    setShowNumber(id);
  };

  const position = [];
  if (data) {
    let pos = data[showNumber]?.tags.indexOf("1");
    while (pos > -1) {
      position.push(pos);
      pos = data[showNumber]?.tags.indexOf("1", pos + 1);
    }
  }

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
          onClick={() => routePost()}
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
          <div className="absolute top-[24px] left-[20px] text-[#ffffff]">
            {`🌐 ` + (data && data[showNumber]?.address_name)}
          </div>
          <div className="absolute bottom-[24px] left-[20px] text-cityColor">
            {position.map((item) => {
              return (
                <>
                  <button
                    key={tagList[item].id}
                    className={`px-2.5 py-1 text-xs font-semibold text-[#ffffff] rounded-[50px] border bg-white border-[#ffffff] `}
                  >
                    {tagList[item].name}
                  </button>
                </>
              );
            })}
            <div className="text-[#ffffff]">
              {data && data[showNumber]?.content}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center ml-[40px] mt-[7px]">
          {data &&
            data.map((item: any, index: number) => {
              return (
                <>
                  <div
                    key={item.id}
                    className={
                      `${
                        index === showNumber
                          ? `postButtonClick`
                          : `postButtonNonClick`
                      }` + " postButton cursor-pointer"
                    }
                    onClick={() => handleCarousel(index)}
                  />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default PopularPost;
