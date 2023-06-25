import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Player from "components/common/player/Player";
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

function Header({comment} : any) {
  return(
    <div className = 'w-[390px] h-[70px] relative'>
          <p className='text-[20px] mt-[10px] font-bold absolute left-[40px]'>같이 감상하면 좋은 곡</p>
    </div>
  );
}

function Music({onStartPlay, onStopPlay, time, currentTime} : any) {

  return(
    <div className = 'w-[390px] h-[227px] relative'>
        <div className = 'w-[350px] h-[70px] absolute right-0'>
          <p className='text-[20px] mt-[10px]'>같이 감상하면 좋은 곡</p>
        </div>
        <div className = 'w-[350px] h-[157]px absolute right-0 bottom-[32px]' style={{ backgroundColor: '#DFDFDF'}} >
          <p className='text-[20px]'>song_name</p>
          <p className='text-[20px]'>artist_name</p>
          <p>{moment(time * 1000).format("mm:ss")}</p>
          <p>{moment(currentTime * 1000).format("mm:ss")}</p>
          <button onClick={onStartPlay} className=''>재생</button>
          <button onClick={onStopPlay} className=''>중단</button>
        </div>
    </div>
  );
}

function Content({data, userName} : any) {
  return(
    <>
      <div className='w-[350px] h-[10px] bg-st-gray-10 mt-[32px] ml-[40px]'/>
      <div className = 'w-[390px] h-[566px] relative'>
        <div className = 'w-[330px] h-[21px] absolute right-[20px]'>
          <p style={{borderLeft: '1px soild black'}}>May 21</p> 
          <p>{data}</p>
        </div>
        <div className = 'w-[330px] h-[60px] absolute top-[30px] right-[20px]'>
          <Userimg></Userimg>
          <p>{userName}</p>
        </div>
        <div className = 'w-[350px] h-[467px] absolute top-[100px] right-[0px]'>
          <ContentImg></ContentImg>
        </div>
      </div>
    </>
  );
}

function Tag({tagList} : any) {
  return(
    <>
    <div className ='h-[26px] border-[1px] px-[10px] py-[2px] border-st-gray-07 rounded-[50px]'>{'힙한'}</div>
    <div className ='h-[26px] border-[1px] px-[10px] py-[2px] border-st-gray-07 rounded-[50px] '>{'예스러운 거리'}</div>
    </>
  );
}

function ImageInfo({tagList, info, location} : any) {
  return(
    <div className = 'w-[390px] h-[284px] relative mt-[32px] mb-[32px]'>
      <div className = 'w-[330px] h-[138px] absolute left-[40px]'>
        <div className = 'w-[330px] h-[26px] flex flex-row items-start gap-[10px]'>
          <Tag tagList={tagList} ></Tag>
        </div>
        <div className = 'w-[330px] h-[96px] mt-[16px] overflow-auto scrollbar-hide'>{info}
        기상청에 따르면 현재 중국 상하이에서 제주까지 정체전선이 걸쳐진 상황이며 잘 발달한 비구름대가 우리나라를 향해 북상 중이다.박중환 기상청 예보분석관은 "남쪽에서 따뜻하고 습한 공기가 유입되는 가운데 정체전선상 발달한 저기압이 우리나라로 들어오면서 전국에 많은 비가 강하게 내리겠다"라고 설명했다.제주와 남해안에는 이미 장맛비가 내리고 있다. 제주 한라산 일부엔 이날 들어 정오까지 이미 100㎜ 안팎 비가 쏟아졌다. 정체전선 위에 발달한 저기압의 앞쪽과 북태평양고기압 가장자리에서 부는 고온다습한 남풍을 맞는 제주산지와 남해안 강수량이 특히 많을 것으로 예상된다. 정체전선 움직임에 따라 비가 집중적으로 쏟아지는 지역이 조금씩 바뀌겠다.제주와 남해안, 지리산 부근은 이날 밤까지 비가 거세게 내리겠다.
        
        </div>
      </div>
      <div className = 'w-[390px] h-[114px] absolute top-[170px]'>
        <div className = 'w-[330px] h-[70px] absolute left-[40px]'>
          <p className="absolute top-[20px] text-[20px] font-bold">이 장소는 어디인가요?</p></div>
        <div className = 'w-[330px] h-[44px] absolute top-[70px] left-[40px] border-2'>
          <Mark className="absolute top-[14px] left-[14px]" ></Mark>
          <span className = 'w-[281px] h-[24px] text-[16px] absolute left-[39px] top-[10px]'>수원시{location}</span>
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
          <p className='w-[182px] h-[21px]'>{'teo'}</p>
          <p className='w-[182px] h-[21px] absolute top-[29px]'>{'2023 06 15'}</p>
        </div>
        <div className = 'w-[96px] h-[60px] absolute right-0'>
          <Dot className = 'w-[36px] h-[36px] absolute left-[12px]'></Dot>
          <Dot className = 'w-[36px] h-[36px] absolute right-0' ></Dot>
        </div>
      </div>
      <div className = 'w-[350px] h-[84px] absolute left-[20px] top-[108px]'>
        텍스트내용
      </div>
    </div>
  );
}

function CommentList({comment} : any) {
  return(
    <div className='w-[390px] h-[432px] overflow-auto scrollbar-hide'>
    <CommentListItem></CommentListItem>
    <CommentListItem></CommentListItem>
    <CommentListItem></CommentListItem>
    </div>
  );
}

function CommentInput({newComment,  setNewComment, onSend} : any) {
  return(
    <div className = 'w-[390px] h-[85px] relative'>
      <form className = 'w-[350px] h-[48px] absolute left-[20px] top-[10px] bg-st-gray-02'> 
        <input className = 'w-[330px] h-[48px] bg-st-gray-02 px-[16px] focus:outline-none' placeholder='댓글을 입력하세요' value={newComment} onChange={(event) => { setNewComment(event.target.value); console.log(event.target.value); }}/>    
        <Send className = 'w-[24px] h-[24px] absolute right-[8px] top-[8px]' onClick={onSend} />
      </form>
    </div>
  );
}

function Comment({commentNum, newComment, setNewComment, onSend} : any) {
  return(
    <div>
        <div className = 'w-[390px] h-[70px] mt-[32px] mb-[32px] relative'>
          <p className="text-[20px] absolute left-[40px] top-[20px]">
          댓글 {commentNum}</p>
        </div>
        <CommentList></CommentList>
        <CommentInput newComment={newComment} setNewComment={setNewComment} onSend={onSend}></CommentInput>
    </div>
  );
}

function Detail() {
  const [audio] = useState(new Audio(music1));
  const [playing, setPlaying] = useState(false);
  //const [songName, setSongName] = useState(false);
  //const [artistName, setArtistName] = useState(false);
  const [userName, setUserName] = useState('');
  const [imagePreview, setImagePreview] = useState("");
  const [comment, setComment] = useState([]);
  const [commentNum, setCommentNum] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  const [result, setResult] = useState<AxiosResponse | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const callAPI = async () => {
    try{
      const res = await axios.get("https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/board/101");
      console.log(res);
      setResult(res);
     }catch(err){
      console.log("Error:", err);
     }
  };

  /* const callAPI2 = async () => {
    try{
      const res = await axios.post("https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/board/comment", 
      {    
        nickname: 'yarn',
        content: newComment
      })
      const data = res.data.result;
      console.log(data);
     }catch(err){
      console.log("Error:", err);
     }
  }; */

  const callAPI3 = async () => {
    const formData = new FormData();
    formData.append('nickname', 'yarn')
    formData.append('content', newComment)
    try{
      const res = await axios.post("https://port-0-java-springboot-teo-backend-7xwyjq992lljba9lba.sel4.cloudtype.app/board/comment", 
      formData
      )
      const data = res.data.result;
      console.log(data);
     }catch(err){
      console.log("Error:", err);
     }
  };

  /* useEffect(() => {
    callAPI();
  }, [result]); */

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
    callAPI3();
  }

  return(
    <>   
      <Header></Header>
      <Player onStartPlay={onStartPlay} onStopPlay={onStopPlay} playTime={currentTime}></Player>
      <div className='w-[390px] h-[14px] bg-st-gray-02 mt-[32px]'></div>
      <Content></Content>
      <ImageInfo></ImageInfo>
      <div className='w-[390px] h-[14px] bg-st-gray-02'></div>
      <Comment commentNum={commentNum} newComment={newComment} setNewComment={setNewComment}
      onSend={onSend}> </Comment>  
    </>
  );
}

export default Detail;