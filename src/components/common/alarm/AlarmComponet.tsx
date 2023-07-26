import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type PostProps = {
  post: {
    id?: number | undefined;
    post_id: number | undefined;
    createdDate?: string | undefined;
    title?: string | undefined;
    message?: string | undefined;
    content?: string | undefined;
    image_url?: string | undefined;
    modifiedDate?: string | undefined;
  };
};

export const AlarmComponent = ({ post }: PostProps) => {
  const [time, setTime] = useState<string | undefined>("");
  const navigate = useNavigate();

  const getTimes = (times: string) => {
    const clock = times.split(" ")[1];
    const day = times.split(" ")[0]?.split(".");
    const newTime =
      day && day[0] + "년" + day[1] + "월" + day[2] + "일 " + clock;
    setTime(newTime);
  };

  useEffect(() => {
    if (post.createdDate) {
      getTimes(post.createdDate);
    } else if (post.modifiedDate) {
      getTimes(post.modifiedDate);
    }
  }, []);

  return (
    <div
      key={post.id ? post.id : post.post_id}
      onClick={() => {
        post.post_id && navigate(`/detail/${post.post_id}`);
      }}
      className="w-[350px] h-[94px] px-5 py-4 flex items-center justify-start"
    >
      {post.image_url !== undefined ? (
        <>
          <img
            className="w-[64px] h-[64px] rounded mr-4"
            src={`${post.image_url}`}
            alt=""
          ></img>
        </>
      ) : (
        <>
          <img
            className="w-[64px] h-[64px] rounded mr-4"
            src="https://storage.googleapis.com/miganzi-bucket/profile_image.png"
            alt=""
          ></img>
        </>
      )}

      <div className="flex flex-col items-start justify-between">
        {post.title ? (
          <p className="text-st-gray-10 text-base font-medium">{post.title}</p>
        ) : null}
        {post.message ? (
          <p className="text-st-gray-08 text-sm font-normal">{post.message}</p>
        ) : (
          <p className="text-st-gray-08 text-sm font-normal">{post.content}</p>
        )}
        <p className="text-st-gray-05 text-xs font-semibold">{time}</p>
      </div>
    </div>
  );
};
