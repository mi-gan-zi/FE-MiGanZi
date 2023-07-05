import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Player from "../components/common/player/Player2";
import { tagList } from "../@types/tag.type";
import moment from 'moment';
import music1 from '../assets/SimpleSound.mp3';
import exampleImg from '../assets/example.png';
import  { ReactComponent as Send } from '../assets/Send.svg';
import { ReactComponent as Userimg } from '../assets/Userimg.svg';
import { ReactComponent as Play } from '../assets/player.svg';
import { ReactComponent as ContentImg } from '../assets/Contentimg.svg';
import { ReactComponent as Mark } from '../assets/Mark.svg';
import { ReactComponent as CommentImg } from '../assets/Commentimg.svg';
import { ReactComponent as Dot } from '../assets/Dot.svg';
import axios, { AxiosResponse }from 'axios';

interface CommentType {
  comment?: any[]
}


function Header({comment} : any) {
  return(
    <div className = 'w-[390px] h-[70px] relative'>
          <p className='text-[20px] mt-[10px] font-bold absolute left-[40px]'>같이 감상하면 좋은 곡</p>
    </div>
  );
}

function Content({userName, createdDate, imagePreview} : any) {
  return(
    <>
      <div className='w-[350px] h-[10px] bg-st-gray-10 mt-[32px] ml-[40px]'/>
      <div className = 'w-[390px] h-[566px] relative'>
        <div className = 'w-[330px] h-[21px] absolute right-[20px]'>
          <p style={{borderLeft: '1px soild black'}}>{createdDate}</p> 
          <p></p>
        </div>
        <div className = 'w-[330px] h-[60px] absolute top-[30px]  relative'>
          <Userimg className="absolute left-[40px]"></Userimg>
          <p  className="absolute left-[120px] top-[20px] ">{userName}</p>
        </div>
        <div className = 'w-[350px] h-[467px] absolute top-[100px] right-[0px]'>
          <img src={imagePreview} className="w-[350px] h-[467px]" />
        </div>
      </div>
    </>
  );
}

function Tag({tags} : any) {
  const example = "010000000000"
  if(tags){
    return(
      <>
      {tagList.filter((item) =>{ if(tags[item.id] == '1'){ return item}}).map((item) => (
        <div className="h-[26px] border-[1px] px-[10px] py-[2px] border-st-gray-07 rounded-[50px] ">
        {item.name}
        </div>
      ))}
      </>
    );
  }
  else{
    return(
      <></>
    )
  }
}

function ImageInfo({tags, info, location} : any) {
  return(
    <div className = 'w-[390px] h-[284px] relative mt-[32px] mb-[32px]'>
      <div className = 'w-[330px] h-[138px] absolute left-[40px]'>
        <div className = 'w-[330px] h-[26px] flex flex-row items-start gap-[10px]'>
          <Tag tags={tags} ></Tag>
        </div>
        <div className = 'w-[330px] h-[96px] mt-[16px] overflow-auto scrollbar-hide'>{info}
        {info} 
        </div>
      </div>
      <div className = 'w-[390px] h-[114px] absolute top-[170px]'>
        <div className = 'w-[330px] h-[70px] absolute left-[40px]'>
          <p className="absolute top-[20px] text-[20px] font-bold">이 장소는 어디인가요?</p></div>
        <div className = 'w-[330px] h-[44px] absolute top-[70px] left-[40px] border-2'>
          <Mark className="absolute top-[14px] left-[14px]" ></Mark>
          <span className = 'w-[281px] h-[24px] text-[16px] absolute left-[39px] top-[10px]'>{location}</span>
        </div>
      </div>
    </div>
  );
}

function CommentListItem({comment} : any) {
  return(
    <div className = 'w-[390px] h-[216px] relative'>
      <div className = 'w-[350px] h-[60px] absolute top-[24px] left-[20px]'>
        <CommentImg className = 'w-[60px] h-[60px] absolute left-0'></CommentImg>
        <div className = 'w-[182px] h-[60px] absolute left-[72px]'>
          <p className='w-[182px] h-[21px]'>{comment.nickname}</p>
          <p className='w-[182px] h-[21px] absolute top-[29px]'>{comment.createdDate}</p>
        </div>
        <div className = 'w-[96px] h-[60px] absolute right-0'>
          <Dot className = 'w-[36px] h-[36px] absolute left-[12px]'></Dot>
          <Dot className = 'w-[36px] h-[36px] absolute right-0' ></Dot>
        </div>
      </div>
      <div className = 'w-[350px] h-[84px] absolute left-[20px] top-[108px]'>
        {comment.content}
      </div>
    </div>
  );
}

function CommentList({comment} : CommentType) {
  return(
    <div className='w-[390px] h-[432px] overflow-auto scrollbar-hide'>
      {comment && comment.map((subItem, index) => (
        <CommentListItem comment={subItem} />
      ))}
    </div>
  );
}

function CommentInput({setComment, newComment,  setNewComment, onSend} : any) {
  return(
    <div className = 'w-[390px] h-[85px] mb-[100px] relative'>
      <form className = 'w-[350px] h-[48px] absolute left-[20px] top-[10px] bg-st-gray-02'> 
        <input className = 'w-[330px] h-[48px] bg-st-gray-02 px-[16px] focus:outline-none' placeholder='댓글을 입력하세요' value={newComment} 
            onChange={(event) => { setNewComment(event.target.value); console.log(event.target.value); }}/>    
        <Send className = 'w-[24px] h-[24px] absolute right-[8px] top-[8px]' onClick={onSend} />
      </form>
    </div>
  );
}

function Comment({comment, commentNum, newComment, setNewComment, onSend} : any) {
  return(
    <div>
        <div className = 'w-[390px] h-[70px] mt-[32px] mb-[32px] relative'>
          <p className="text-[20px] absolute left-[40px] top-[20px]">
          댓글 {commentNum}</p>
        </div>
        <CommentList comment={comment}></CommentList>
        <CommentInput newComment={newComment} setNewComment={setNewComment} onSend={onSend}></CommentInput>
    </div>
  );
}


function Detail() {
  const [audio] = useState(new Audio(music1));
  const [playing, setPlaying] = useState(false);
  const [nickname, setNickname] = useState<AxiosResponse | null>(null); //작성자
  const [imageUrl, setImageUrl] = useState<AxiosResponse | null>(null); //메인이미지
  const [createdDate, setCreatedDate] = useState<AxiosResponse | null>(null); //생성날짜
  const [addressName, setAddressName] = useState<AxiosResponse | null>(null); //위치
  const [content, setContent] = useState<AxiosResponse | null>(null); //메인글
  const [tags, setTags] = useState<AxiosResponse | null>(null); //메인글

  const [comment, setComment] = useState<AxiosResponse | null>(null);
  const [commentNum, setCommentNum] = useState(0); //댓글수
  const [newComment, setNewComment] = useState('');
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const callAPI = async () => {
    try {
      const url = `https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/user/board/${id}`;
      const res = await axios.get(url);
      console.log(res.data);
      setNickname(res.data.nickname);
      setImageUrl(res.data.imageUrl);
      setCreatedDate(res.data.createdDate);
      setAddressName(res.data.addressName);
      setContent(res.data.content);
      setComment(res.data.userComments);
      setTags(res.data.tags);
      setCommentNum(res.data.userComments.length)

    } catch (err) {
      console.log("Error:", err);
    }
  };

  const callAPI2 = async () => {
    const formData = new FormData();
    formData.append('content', newComment)
    formData.append('postId', `${id}`)
    try{
      const res = await axios.post("https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/user/board/comment", 
      formData, {headers:{Authorization: "Bearer " + localStorage.getItem("token")}}
      )
      callAPI();
     }catch(err){
      console.log("Error:", err);
     }
  };

  useEffect(() => {
    callAPI();
  }, []); 

  useEffect(() => {
    playing ? audio.play() : audio.pause();
    if (playing){
      setTotalTime(audio.duration);
      audio.addEventListener('timeupdate',() => {   
        setCurrentTime(audio.currentTime.toString());
      });
    }
  }, [playing]);

  const onStartPlay = () => {
    setPlaying(true);
  }

  const onStopPlay = () => {
    setPlaying(false)
  }

  const onSend = () => {
    /* setComment(state => [...state, {
      commentuser: 'teo' ,
      commentdate: "2023-06-26",
      commentimg: '',
      commentcontent: newComment
    }]) */
    callAPI2();
  }

  return(
    <>   
      <Header></Header>
      <Player onStartPlay={onStartPlay} onStopPlay={onStopPlay} playTime={currentTime}></Player>
      <div className='w-[390px] h-[14px] bg-st-gray-02 mt-[32px]'></div>
      <Content userName={nickname} createdDate={createdDate} imagePreview={imageUrl}></Content>
      <ImageInfo tags = {tags} info={content} location={addressName} ></ImageInfo>
      <div className='w-[390px] h-[14px] bg-st-gray-02'></div>
      <Comment comment = {comment} commentNum={commentNum} newComment={newComment} setNewComment={setNewComment}
      onSend={onSend}> </Comment>  
    </>
  );
}

export default Detail;