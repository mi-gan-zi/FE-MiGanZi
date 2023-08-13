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
export default function Player(props: PropsType) {
  const { song, artist, playList, setPlaying, targetId, imgURL, playing } =
    props;
  console.log(artist);
  const [totalTime, setTotalTime] = useState(0);
  const [current, setCurrentTime] = useState(0);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const audio = new Audio(playList);

    const timeUpdateHandler = () => {
      setCurrentTime(audio.currentTime);
      setRatio((audio.currentTime / audio.duration) * 100);
      if (audio.duration === audio.currentTime) {
        setPlaying(false);
      }
    };

    if (playing) {
      audio.play().then(() => {
        audio.addEventListener("timeupdate", timeUpdateHandler);
      });
    } else {
      audio.pause();
      audio.removeEventListener("timeupdate", timeUpdateHandler);
    }

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", timeUpdateHandler);
    };
  }, [playing, playList, setPlaying]);

  const onStartPlay = () => {
    if (song !== "Happay") playing || setPlaying(true);
  };

  const onStopPlay = () => {
    if (playing) {
      setPlaying(false);
    }
  };
  return (
    <div className="bg-yellow-300 flex justify-end">
      <div className="bg-[#F5F4F3] border-st-gray-03 border-[1px] w-[370px] h-[157px] rounded-l-xl py-4 flex justify-between px-6 relative ">
        <article className="left_box flex-col ">
          <div className="description flex-col flex gap-1 mb-2 ">
            <p className="w-[120px] text-[14px] ">
              {song ? "" : "음악을 선택해주세요."}
            </p>
            <p>{artist}</p>
            <p className="thin text-[12px]">
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
        <article className="record-box mr-2 w-[190px] relative">
          <CircularProgressbarWithChildren
            value={ratio}
            strokeWidth={5}
            className={"w-[125px] h-[125px] absolute right-[15px]"}
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
                    `rounded-full w-[105px] h-[105px] absolute left-[60px] top-[200px] ` +
                    (playing ? "animate-spin" : "")
                  }
                  src={imgURL}
                  alt=""
                />
                <div className="rounded-full w-[30px] h-[30px] bg-st-white absolute top-[235px] right-[62px] text-active-blue" />
              </>
            ) : (
              <>
                {/* <img
                  className={
                    `rounded-full w-[105px] h-[105px] absolute left-[60px] top-[200px]`
                    // (playing ? "animate-spin" : "")
                  }
                  src={defrecord}
                  alt=""
                /> */}
                <div
                  className={
                    `record w-[100px] h-[100px] bg-st-gray-09 rounded-full flex justify-center items-center shadow-md absolute left-[63px] top-[202.5px] ` +
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
                </div>
                <div className="rounded-full w-[10px] h-[10px] bg-st-white absolute"></div>
              </>
            )}
          </CircularProgressbarWithChildren>
        </article>
      </div>
    </div>
  );
}
