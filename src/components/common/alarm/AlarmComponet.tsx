import React from "react";

export const AlarmComponent = ({ post }: any) => {
  const clock = post?.createdDate.split(" ")[1];
  const day = post?.createdDate.split(" ")[0].split(".");
  const time = day[0] + "년" + day[1] + "월" + day[2] + "일 " + clock;

  return (
    <div
      className="w-[350px] h-[94px] px-5 py-4 flex items-center justify-start"
      key={post?.id}
    >
      <img
        className="w-[64px] h-[64px] rounded mr-4"
        src="https://storage.googleapis.com/miganzi-bucket/profile_image.png"
        alt=""
      ></img>
      <div className="flex flex-col items-start justify-between">
        <p className="text-st-gray-10 text-base font-medium">{post.title}</p>
        <p className="text-st-gray-08 text-sm font-normal">{post.message}</p>
        <p className="text-st-gray-05 text-xs font-semibold">{time}</p>
      </div>
    </div>
  );
};
