import React from "react";
import InfinityPost from "components/common/post/InfinityPost";

export function AllPost(): React.ReactElement {
  const API_URL = "user/board/posts?page=0";

  return (
    <>
      <InfinityPost url={API_URL} />
    </>
  );
}

export default AllPost;
