import React, { useEffect, useState } from "react";
interface PropsType {
  song?: string;
  artist?: string;
  playList: any;
}
export default function Player(props: PropsType) {
  const { song = "Happay", artist = "방랑자", playList } = props;
  const [playing, setPlaying] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [current, setCurrentTime] = useState(0);
  const [audio, setAudio] = useState(new Audio());

  console.log(playList);
  useEffect(() => {
    playing ? audio.play() : audio.pause();
    if (playing) {
      setTotalTime(audio.duration);
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
    }
  }, [playing]);
  useEffect(() => {
    if (playList) {
      setAudio(new Audio(playList));
    }
  }, [playList]);

  const onStartPlay = () => {
    playing || setPlaying(true);
  };

  const onStopPlay = () => {
    // playing && audio.pause();
    playing && setPlaying(false);
  };
  return (
    <div className="bg-yellow-300 flex justify-end">
      <div className="bg-[#F5F4F3] border-st-gray-03 border-[1px] w-[370px] h-[157px] rounded-l-xl py-4 flex justify-between px-6">
        <article className="left_box flex-col flex">
          <div className="description flex-col flex gap-1 mb-2">
            <p>{song}</p>
            <p>{artist}</p>
            <p className="thin">{current}</p>
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
          <div className="progress-bar border-[5px] border-solid border-gray-500 rounded-full w-[120px] h-[120px] flex items-center justify-center shadow-xl">
            <div className="record w-[100px] h-[100px] bg-st-gray-09 rounded-full flex justify-center items-center shadow-md">
              <div className="first-line border-[1px] border-solid border-gray-900 w-[90px] h-[90px]  rounded-full items-center justify-center flex">
                <div className="first-line border-[1px] border-solid border-gray-900 w-[75px] h-[75px]  rounded-full items-center justify-center flex">
                  <div className="first-line border-[1px] border-solid border-gray-900 w-[60px] h-[60px]  rounded-full items-center justify-center flex">
                    <div className="first-line border-[1px] border-solid border-gray-900 w-[45px] h-[45px]  rounded-full items-center justify-center flex">
                      <div className="w-7 h-7 rounded-full bg-st-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
