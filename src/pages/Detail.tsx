import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import music1 from '../assets/SimpleSound.mp3';
import exampleImg from '../assets/example.png';
import  { ReactComponent as Send } from '../assets/Send.svg';
import { ReactComponent as Userimg } from '../assets/Userimg.svg';
import { ReactComponent as Player } from '../assets/player.svg';
import { ReactComponent as ContentImg } from '../assets/Contentimg.svg';
import { ReactComponent as Mark } from '../assets/Mark.svg';
import { ReactComponent as CommentImg } from '../assets/Commentimg.svg';
import { ReactComponent as Dot } from '../assets/Dot.svg';

function Header({comment} : any) {
  return(
    <div className = 'border-b-2 w-[390px] h-[56px]'>
        <button>{'<'}</button>
    </div>
  );
}

function Music({onStartPlay, onStopPlay, time, currentTime} : any) {

  return(
    <div className = 'w-[390px] h-[227px]'>
        <div className = 'w-[350px] h-[70px]'>
          <p className='text-[20px]'>같이 감상하면 좋은 곡</p>
        </div>
        <div className = 'w-[350px] h-[157]px' style={{ backgroundColor: '#DFDFDF'}} >
          <p className='text-[20px]'>song_name</p>
          <p className='text-[20px]'>artist_name</p>
          <p>{time}</p>
          <p>{currentTime}</p>
          <button onClick={onStartPlay} className=''>재생</button>
          <button onClick={onStopPlay} className=''>중단</button>
        </div>
    </div>
  );
}

function Content({data, userName} : any) {
  return(
    <>
      <hr style={{ width: '350px', border: '4px solid #0F0F0F', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}/>
      <div className = 'w-[390px] h-[566px]'>
        <div className = 'w-[330px] h-[21px]'>
          <p style={{borderLeft: '1px soild black'}}>May 21</p> 
          <p>{data}</p>
        </div>
        <div className = 'w-[330px] h-[60px]'>
          <Userimg></Userimg>
          <p>{userName}</p>
        </div>
        <div className = 'w-[350px] h-[467px]'>
          <ContentImg></ContentImg>
        </div>
      </div>
    </>
  );
}

function ImageInfo({tagList, info, location} : any) {
  return(
    <div className = 'w-[390px] h-[284px]'>
      <div className = 'w-[390px] h-[138px]'>
        <div className = 'w-[330px] h-[26px]'>태그자리{tagList}</div>
        <div className = 'w-[330px] h-[96px] overflow-auto'>설명자리{info}</div>
      </div>
      <div className = 'w-[390px] h-[114px]'>
        <div className = 'w-[330px] h-[70px]'><p>이 장소는 어디인가요?</p></div>
        <div className = 'w-[330px] h-[44px]'>
          <Mark></Mark>
          <p className = 'w-[330px] h-[44px] text-[16px]'>{location}</p>
        </div>
      </div>
    </div>
  );
}

function CommentListItem({comment} : any) {
  return(
    <div className = 'w-[390px] h-[216px]'>
      <div className = 'w-[350px] h-[60px]'>
        <CommentImg style={{ width: '60px', height:'60px'}}></CommentImg>
        <div>
          <p>{'teo'}</p>
          <p>{'sprint'}</p>
        </div>
        <div>
          <Dot></Dot>
          <Dot></Dot>
        </div>
      </div>
      <div className = 'w-[350px] h-[84px]'>

      </div>

    </div>
  );
}

function CommentList({comment} : any) {
  return(
    <div><CommentListItem></CommentListItem></div>
  );
}

function Comment({commentNum, newComment, setNewComment} : any) {
  return(
    <div>
        <div className = 'w-[390px] h-[70px] text-20px'>댓글{commentNum}</div>
        <CommentList></CommentList>
        <div className = 'w-[390px] h-[85px]'>
          <form style={{ width: "350px", height: "48px", position: "relative", borderRadius: "12px"}}> 
            <input style={{ width: "276px", height: "24px", paddingLeft: "40px" }} placeholder='댓글을 입력하세요' value={newComment} onChange={(event) => { setNewComment(event.target.value);}}/>    
            <Send style={{ width:'24px', height:'24px', position: "absolute", right: "6px", top: "5px",}} />
          </form>
        </div>
    </div>
  );
}

function Detail() {
  const [audio] = useState(new Audio(music1));
  const [playing, setPlaying] = useState(false);
  const [songName, setSongName] = useState(false);
  const [artistName, setArtistName] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [comment, setComment] = useState([]);
  const [commentNum, setCommentNum] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [totalTime, setTotalTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    playing ? audio.play() : audio.pause();
    if (playing){
      setTotalTime(audio.duration);
      audio.addEventListener('timeupdate',() => {   
        setCurrentTime(audio.currentTime);
      });
    }
  }, [playing]);

  const onStartPlay = () => {
    setPlaying(true);
  }

  const onStopPlay = () => {
    setPlaying(false)
  }

  return(
    <>
    <div style={{ width: '390px', height:'2079px', border: '1px solid black'}}>
      <Header></Header>
      <Music onStartPlay={onStartPlay} onStopPlay={onStopPlay} time={totalTime} currentTime={currentTime}></Music>
      <div className='w-[390px] h-[14px] st-gray-02'></div>
      <Content></Content>
      <ImageInfo></ImageInfo>
      <Comment commentNum={commentNum}></Comment>
      
    </div>
    </>
  );
}

export default Detail;