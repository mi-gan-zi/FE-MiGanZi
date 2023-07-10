import { useNavigate } from "react-router-dom";
import { Post } from "../../pages/Main";

export default function PostList({ posts }: { posts: Post[] }) {
  const navigate = useNavigate();
  return (
    <div className="w-[390px] flex flex-wrap flex-column ">
      {posts.map((item) => {
        return (
          <img
            src={item.imageUrl}
            alt=""
            className="w-[120px] h-[169px] my-[2px] mx-[1px]"
            key={item.id}
            onClick={() => navigate(`/detail/${item.id}`)}
          />
        );
      })}
    </div>
  );
}
