import moment from "moment";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import defrecord from "assets/defrecord.png";
interface PropsType {
  song?: string;
  artist?: string;
  playList: any;
  targetId?: number;
  imgURL?: string;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setIsCheck: Dispatch<SetStateAction<boolean>>;
}
export default function Player(props: PropsType) {
  const {
    song = "음악을 선택해주세요!",
    artist,
    playList,
    setIsCheck,
    setPlaying,
    targetId,
    imgURL,
    playing,
  } = props;
  // const [playing, setPlaying] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [current, setCurrentTime] = useState(0);
  const [audio, setAudio] = useState(new Audio(playList));
  const [playId, setPlayId] = useState();

  useEffect(() => {
    if (audio) {
      playing ? audio.play() : audio.pause();
      if (playing) {
        setTotalTime(audio.duration);
        audio.addEventListener("timeupdate", () => {
          setCurrentTime(audio.currentTime);
        });
      }
    }
  }, [playing, targetId, audio]);
  useEffect(() => {
    // if (playList) {
    setAudio(new Audio(playList));
    setIsCheck(true);
    // }
  }, [playList, targetId]);
  // useEffect(() => {
  //   // setPlaying(false);
  //   // setAudio(new Audio());
  //   // audio.play();
  // }, [targetId]);

  const onStartPlay = () => {
    if (song !== "Happay") playing || setPlaying(true);
  };

  const onStopPlay = () => {
    // playing && audio.pause();
    if (playing) {
      setPlaying(false);
    } else {
      return;
    }
    // playing && setPlaying(false);
  };
  return (
    <div className="bg-yellow-300 flex justify-end">
      <div className="bg-[#F5F4F3] border-st-gray-03 border-[1px] w-[370px] h-[157px] rounded-l-xl py-4 flex justify-between px-6">
        <article className="left_box flex-col flex">
          <div className="description flex-col flex gap-1 mb-2">
            <p>{song}</p>
            <p>{artist}</p>
            <p className="thin">
              {moment(Number(current) * 1000).format("mm:ss")}
            </p>
          </div>
          <div className="button_box flex gap-3">
            <div
              className="stop-button border-[#007DF0] border-[1px] w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer"
              onClick={onStopPlay}
            >
              <div className="bg-[#007DF0] w-[16px] h-[16px] "></div>
            </div>
            <div
              className="play-button rounded-full bg-[#007DF0] w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
              onClick={onStartPlay}
            >
              <div className="border-b-[10px] border-t-[10px] border-r-0 border-l-[16px] ml-1 border-solid border-b-st-trans border-t-st-trans border-r-transparent border-l-st-white w-0 h-0"></div>
            </div>
          </div>
        </article>
        <article className="record-box mr-2">
          <div className="progress-bar border-[5px]  border-solid border-gray-500 rounded-full w-[120px] h-[120px] flex items-center justify-center shadow-xl relative">
            {playList ? (
              <>
                <img
                  className={
                    `rounded-full w-[100px] h-[100px] ` +
                    (playing ? "animate-spin" : "")
                  }
                  src={imgURL}
                  alt=""
                />
                <div className="rounded-full w-[30px] h-[30px] bg-st-white absolute"></div>
              </>
            ) : (
              <>
                <img
                  className={
                    `rounded-full w-[100px] h-[100px] `
                    // (playing ? "animate-spin" : "")
                  }
                  src={defrecord}
                  alt=""
                />
                <div className="rounded-full w-[10px] h-[10px] bg-st-white absolute"></div>
              </>
            )}

            {/* <div
              className={
                `record w-[100px] h-[100px] bg-st-gray-09 rounded-full flex justify-center items-center shadow-md  ` +
                (playing ? "animate-spin" : "")
              }
            >
              <div className="first-line border-b-[1px] border-solid border-b-st-gray-05 w-[90px] h-[90px]  rounded-full items-center justify-center flex">
                <div className="first-line border-b-[1px] border-solid border-b-st-gray-05 w-[75px] h-[75px]  rounded-full items-center justify-center flex">
                  <div className="first-line border-b-[1px] border-solid border-st-gray-05 w-[60px] h-[60px]  rounded-full items-center justify-center flex">
                    <div className="first-line border-b-[1px] border-solid border-st-gray-05 w-[45px] h-[45px]  rounded-full items-center justify-center flex">
                      <div className="w-7 h-7 rounded-full bg-st-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </article>
      </div>
    </div>
  );
}
