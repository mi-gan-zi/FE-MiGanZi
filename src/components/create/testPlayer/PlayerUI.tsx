import moment from "moment";
import React, { Dispatch, SetStateAction } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { playList } from "../MusicDataList";
import defrecord from "assets/defrecord.png";
export interface PlayerUIProps {
  song?: string;
  artist?: string;
  imgURL?: string;
  current: number;
  totalTime: number;
  ratio: number;
  playing: boolean;
  targetId: any;
  onStartPlay: () => void;
  onStopPlay: () => void;
  setPlaying: Dispatch<SetStateAction<any>>;
}

const PlayerUI: React.FC<PlayerUIProps> = ({
  song,
  artist,
  imgURL,
  current,
  totalTime,
  ratio,
  targetId,
  onStartPlay,
  onStopPlay,
  setPlaying,
  playing,
}) => {
  return (
    <div className="bg-yellow-300 flex justify-end">
      <div className="bg-[#F5F4F3] border-st-gray-03 border-[1px] w-[370px] h-[157px] rounded-l-xl py-4 flex justify-between px-6 relative ">
        <article className="left_box flex-col ">
          <div className="description flex-col flex gap-1 mb-2">
            <p className="w-[120px]">{song}</p>
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
        <article className="record-box mr-2 w-[190px] relative">
          <CircularProgressbarWithChildren
            value={ratio}
            strokeWidth={5}
            className={"w-[125px] h-[125px] absolute right-[16px]"}
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
                <img
                  className={`rounded-full w-[105px] h-[105px] absolute left-[60px] top-[200px]`}
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
};

export default PlayerUI;
