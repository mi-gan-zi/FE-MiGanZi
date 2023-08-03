import moment from "moment";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import defrecord from "assets/defrecord.png";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

interface PropsType {
  song?: string;
  artist?: string;
  playList: any;
  targetId?: number;
  imgURL?: string;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
}
//TODO: 리펙터링 하고 필요없으면 휴지통
// const temp2 =
//   "progress-bar border-[5px]  border-solid border-gray-500 rounded-full w-[120px] h-[120px] flex items-center justify-center shadow-xl relative";
export default function Player(props: PropsType) {
  const {
    song = "음악을 선택해주세요!",
    artist,
    playList,
    setPlaying,
    targetId,
    imgURL,
    playing,
  } = props;
  // const [playing, setPlaying] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [current, setCurrentTime] = useState(0);
  const [audio, setAudio] = useState(new Audio(playList));
  const [ratio, setRatio] = useState(0);

  playing ? audio.play() : audio.pause();
  useEffect(() => {
    if (audio) {
      if (playing) {
        setTotalTime(audio.duration);
        audio.addEventListener("timeupdate", () => {
          setCurrentTime(audio.currentTime);
          setRatio((audio.currentTime / audio.duration) * 100);
          if (audio.duration == audio.currentTime) {
            setPlaying(false);
          }
        });
      }
    }
  }, [playing, targetId, audio]);
  useEffect(() => {
    setAudio(new Audio(playList));
  }, [playList, targetId]);

  const onStartPlay = () => {
    if (song !== "Happay") playing || setPlaying(true);
  };

  const onStopPlay = () => {
    if (playing) {
      setPlaying(false);
    }
  };
  return (
    <div className="bg-yellow-300 flex justify-end ">
      <div className="bg-[#F5F4F3] border-st-gray-03 border-[1px] w-[370px] h-[157px] rounded-l-xl py-4 flex justify-between px-6 relative ">
        <article className="left_box flex-col ">
          <div className="description flex-col flex gap-1 mb-2">
            <p className="w-[135px]">{song}</p>
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

        <article className="record-box mr-1 w-[190px] relative  ">
          <CircularProgressbarWithChildren
            value={ratio}
            strokeWidth={5}
            className={"w-[120px] h-[120px] absolute right-[19px] top-[2px] "}
            styles={{
              path: {
                stroke: "#007DF0",
                strokeLinecap: "butt",
                transition: "stroke-dashoffset 0.5s ease 0s",
              },
              trail: {
                stroke: "#d7d7d7",
              },
            }}
          >
            {playList ? (
              <>
                <img
                  className={
                    `rounded-full w-[100px] h-[100px] absolute left-[60px] top-[200px] ` +
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
                    `rounded-full w-[105px] h-[105px] absolute left-[50px] top-[190px]`
                    // (playing ? "animate-spin" : "")
                  }
                  src={defrecord}
                  alt=""
                />
                <div className="rounded-full w-[10px] h-[10px] bg-st-white absolute"></div>
              </>
            )}
          </CircularProgressbarWithChildren>
        </article>
      </div>
    </div>
  );
}
