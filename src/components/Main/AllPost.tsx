import React from "react";
import InfinityPost from "components/common/post/InfinityPost";

export function AllPost(): React.ReactElement {
  const API_URL: string = "user/board/posts?page=0";

  return (
    <>
      <div className="flex justify-center text-[20px] h-[70px] items-center">
        새로 작성된 아티클을 확인해보세요
      </div>
      <InfinityPost url={API_URL} />
    </>
  );
}

export default AllPost;
