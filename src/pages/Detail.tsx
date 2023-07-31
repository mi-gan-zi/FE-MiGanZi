import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import Player from "../components/common/player/Player";
import { musicList } from "../@types/music.type";
import { tagList } from "../@types/tag.type";
import { ReactComponent as Pre } from "../assets/pre.svg";
import { ReactComponent as Send } from "../assets/Send.svg";
import { ReactComponent as Mark } from "../assets/Mark.svg";
import { ReactComponent as CommentImg } from "../assets/Commentimg.svg";
import { ReactComponent as Dot } from "../assets/Dot.svg";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDetail, postComment } from "services/apis/miganziService";
import axios from "axios";

interface PostDetail {
  createdDate: string;
  modifiedDate: string;
  id: number;
  nickname: string;
  viewCount: number;
  commentCount: number;
  content: string;
  profileImage: string;
  imageUrl: string;
  address_name: string;
  tag: string;
  tagsNum: number;
  music_id: string;
}

interface CommentDetail {
  createdDate: string;
  modifiedDate: string;
  id: number;
  nickname: string;
  content: string;
  profileImage: string;
}

function Header({
  setPlaying,
}: {
  setPlaying: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  async function newhamsu() {
    await setPlaying(false);
    navigate("/");
  }
  return (
    <div className="w-[390px] h-[70px] relative border-b-[1px] border-st-gray-03">
      <Pre
        onClick={() => {
          newhamsu();
        }}
        className="absolute mt-[10px] left-[40px] cursor-pointer"
      ></Pre>
    </div>
  );
}

function Content({
  userName,
  createdDate,
  imagePreview,
  viewCount,
}: {
  userName: PostDetail["nickname"];
  createdDate: PostDetail["createdDate"];
  imagePreview: PostDetail["imageUrl"];
  viewCount: PostDetail["viewCount"];
}) {
  return (
    <>
      <div className="w-[350px] h-[10px] bg-st-gray-10 mt-[32px] ml-[40px]" />
      <div className="w-[390px] h-[566px] relative">
        <div className="w-[330px] h-[21px] absolute right-[20px]">
          <span style={{ borderLeft: "1px soild black" }}>{createdDate}</span>
          <span className="border-l-2 ml-[5px] pl-[5px] ">
            조회수 {viewCount}
          </span>
        </div>
        <div className="w-[330px] h-[60px] absolute top-[30px]  relative">
          <img
            src="https://storage.googleapis.com/miganzi-bucket/profile_image.png"
            className="h-[60px] w-[60px] absolute left-[40px]"
          ></img>
          <p className="absolute left-[120px] top-[20px] ">{userName}</p>
        </div>
        <div className="w-[350px] h-[467px] absolute top-[100px] right-[0px]">
          <img src={imagePreview} className="w-[350px] h-[467px]" />
        </div>
      </div>
    </>
  );
}

function Tag({ tags }: { tags: PostDetail["tag"] }) {
  //테스트용 const example = "010000000000"
  if (tags) {
    return (
      <>
        {tagList
          .filter((item) => {
            if (tags[item.id] == "1") {
              return item;
            }
          })
          .map((item) => (
            <div className="h-[26px] border-[1px] px-[10px] py-[2px] border-st-gray-07 rounded-[50px] ">
              {item.name}
            </div>
          ))}
      </>
    );
  } else {
    return <></>;
  }
}

function ImageInfo({
  tags,
  info,
  location,
}: {
  tags: PostDetail["tag"];
  info: PostDetail["content"];
  location: PostDetail["address_name"];
}) {
  return (
    <div className="w-[390px] h-[284px] relative mt-[32px] mb-[32px]">
      <div className="w-[330px] h-[138px] absolute left-[40px]">
        <div className="w-[330px] h-[26px] flex flex-row items-start gap-[10px]">
          <Tag tags={tags}></Tag>
        </div>
        <div className="w-[330px] h-[96px] mt-[16px] overflow-auto scrollbar-hide">
          {info}
        </div>
      </div>
      <div className="w-[390px] h-[114px] absolute top-[170px]">
        <div className="w-[330px] h-[70px] absolute left-[40px]">
          <p className="absolute top-[20px] text-[20px] font-bold">
            이 장소는 어디인가요?
          </p>
        </div>
        <div className="w-[330px] h-[44px] absolute top-[70px] left-[40px] border-2">
          <Mark className="absolute top-[14px] left-[14px]"></Mark>
          <span className="w-[281px] h-[24px] text-[16px] absolute left-[39px] top-[10px]">
            {location}
          </span>
        </div>
      </div>
    </div>
  );
}

function CommentListItem({ comment }: { comment: CommentDetail }) {
  return (
    <div className="w-[390px] h-[216px] relative">
      <div className="w-[350px] h-[60px] absolute top-[24px] left-[20px]">
        <CommentImg className="w-[60px] h-[60px] absolute left-0"></CommentImg>
        <div className="w-[182px] h-[60px] absolute left-[72px]">
          <p className="w-[182px] h-[21px]">{comment.nickname}</p>
          <p className="w-[182px] h-[21px] absolute top-[29px]">
            {comment.createdDate}
          </p>
        </div>
        <div className="w-[96px] h-[60px] absolute right-0">
          <Dot className="w-[36px] h-[36px] absolute right-0"></Dot>
        </div>
      </div>
      <div className="w-[350px] h-[84px] absolute left-[20px] top-[108px]">
        {comment.content}
      </div>
    </div>
  );
}

function CommentList({
  comment,
  commentEndRef,
}: {
  comment: CommentDetail[];
  commentEndRef: React.ForwardedRef<HTMLDivElement>;
}) {
  return (
    <div className="w-[390px] h-[432px] overflow-auto scrollbar-hide">
      {comment &&
        comment.map((subItem, index) => <CommentListItem comment={subItem} />)}
      <div ref={commentEndRef}></div>
    </div>
  );
}

function CommentInput({
  newComment,
  setNewComment,
  onSendComment,
}: {
  newComment: string;
  setNewComment: Dispatch<SetStateAction<string>>;
  onSendComment: () => void;
}) {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSendComment();
    }
  };

  return (
    <div className="w-[390px] h-[85px] relative">
      <form className="w-[350px] h-[48px] absolute left-[20px] top-[10px] bg-st-gray-02">
        <input
          className="w-[330px] h-[48px] bg-st-gray-02 px-[16px] focus:outline-none"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(event) => {
            setNewComment(event.target.value);
            console.log(event.target.value);
          }}
          onKeyDown={onKeyDown}
        />
        <Send
          className="w-[24px] h-[24px] absolute right-[8px] top-[8px]"
          onClick={onSendComment}
        />
      </form>
    </div>
  );
}

function Comment({
  comment,
  commentNum,
  newComment,
  setNewComment,
  onSendComment,
  commentEndRef,
}: {
  comment: CommentDetail[] | undefined;
  commentNum: number;
  newComment: string;
  setNewComment: Dispatch<SetStateAction<string>>;
  onSendComment: () => void;
  children: React.ReactNode;
  commentEndRef: React.ForwardedRef<HTMLDivElement>;
}) {
  return (
    <div>
      <div className="w-[390px] h-[70px] mt-[32px]  relative">
        <p className="text-[20px] absolute left-[40px] top-[20px]">
          댓글 {commentNum}
        </p>
      </div>
      {comment && (
        <CommentList
          comment={comment}
          commentEndRef={commentEndRef}
        ></CommentList>
      )}
      <CommentInput
        newComment={newComment}
        setNewComment={setNewComment}
        onSendComment={onSendComment}
      ></CommentInput>
    </div>
  );
}

function Detail() {
  const [playing, setPlaying] = useState(false);
  const [musicId, setMusicId] = useState("");
  const [comment, setComment] = useState<CommentDetail[]>();
  const [commentNum, setCommentNum] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [song, setSong] = useState<string>();
  const [artist, setArtist] = useState<string>("");
  const [playTitle, setPlayTitle] = useState();
  const [imgURL, setImgURL] = useState<string>();
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [userToken, setUserToken] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const commentEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [post, setPost] = useState<PostDetail>({
    createdDate: "",
    modifiedDate: "",
    id: 0,
    nickname: "",
    viewCount: 0,
    commentCount: 0,
    content: "",
    profileImage: "",
    imageUrl: "",
    address_name: "",
    tag: "",
    tagsNum: 0,
    music_id: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["board"],
    //@ts-ignore
    queryFn: () => getDetail(id.toString()),
  });

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      //queryClient.invalidateQueries({queryKey: ['comment'] })
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data.data);
      const res = data.data;
      //@ts-ignore
      setPost(res);
      musicList.filter((item) => {
        //@ts-ignore
        if (item.id === parseInt(res.music_id)) {
          setArtist(item.artist);
          setSong(item.song);
          setPlayTitle(item.playList);
          setImgURL(item.imgURL);
          setIsCheck(true);
          setPlaying(false);
          setMusicId(item.id.toString());
        }
      });
      //@ts-ignore
      setComment(res.userComments);
      //@ts-ignore
      setCommentNum(res.userComments.length);
    }
  }, []);

  const onSendComment = async () => {
    /* if (userToken != ''){
      //postComment();
      mutation.mutate({
        id: Date.now(),
        title: 'Do Laundry',
      })
      {commentEndRef.current && commentEndRef.current.scrollIntoView({ behavior: 'smooth' });}
    }
    else{
      navigate('/login');
    } */
    const formData = new FormData();
    formData.append("content", newComment);
    formData.append("postId", `${id}`);
    //mutation.mutate(formData)
    const res = await mutation.mutateAsync(formData);
    console.log(res);
    //@ts-ignore
    setComment(res.data);
    //@ts-ignore
    setCommentNum(res.data.length);
    {
      commentEndRef.current &&
        commentEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header setPlaying={setPlaying}></Header>
      <div className="w-[390px] h-[14px] mb-[20px]">
        <p className="text-[20px] font-bold mt-[20px] ml-[40px]">
          같이 감상하면 좋은 곡
        </p>
      </div>
      <Player
        playing={playing}
        setPlaying={setPlaying}
        playList={playTitle}
        song={song}
        artist={artist}
        imgURL={imgURL}
        setIsCheck={setIsCheck}
      />
      <div className="w-[390px] h-[14px] bg-st-gray-02 mt-[32px]"></div>
      <Content
        userName={post.nickname}
        createdDate={post.createdDate}
        imagePreview={post.imageUrl}
        viewCount={post.viewCount}
      ></Content>
      <ImageInfo
        tags={post.tag}
        info={post.content}
        location={post.address_name}
      ></ImageInfo>
      <div className="w-[390px] h-[14px] bg-st-gray-02"></div>
      <Comment
        comment={comment}
        commentNum={commentNum}
        newComment={newComment}
        setNewComment={setNewComment}
        onSendComment={onSendComment}
        commentEndRef={commentEndRef}
      >
        {" "}
      </Comment>
    </>
  );
}

export default Detail;
