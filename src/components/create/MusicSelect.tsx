import Player from "components/common/player/Player";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { CreateMiganziType } from "./CreateContainer";
import { playList } from "./MusicDataList";

interface PropsType {
  currentStep: CreateMiganziType;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
}
export default function MusicSelect({
  currentStep,
  playing,
  setPlaying,
}: PropsType) {
  const [song, setSong] = useState<string>();
  const [artist, setArtist] = useState<string>("");
  const [playTitle, setPlayTitle] = useState();
  const [targetId, setTargetId] = useState<number>();
  const [imgURL, setImgURL] = useState<string>();
  const refList = useRef<HTMLInputElement>(null);

  const inputValue = (event: any) => {
    const res = event.target?.value;
    setTargetId(parseInt(res));
    playList.filter((id) => {
      if (id.id === parseInt(res)) {
        setArtist(id.artist);
        setSong(id.song);
        setPlayTitle(id.playList);
        setImgURL(id.imgURL);
        setPlaying(false);
        // setMusicId(id.id.toString());
      }
    });
  };

  return (
    <div>
      <h1 className="text-[20px] font-bold p-5">게시글의 첨부할 음악선택</h1>
      <Player
        playing={playing}
        setPlaying={setPlaying}
        playList={playTitle}
        song={song}
        artist={artist}
        imgURL={imgURL}
        targetId={targetId}
      />
      <ul className="py-10 px-4">
        {playList.map((i) => (
          <li
            key={i.id}
            className={
              `flex border-b-st-gray-04 border-b-[1px] justify-between px-5 py-2 ` +
              (i.id === targetId ? " " : "opacity-50 disabled")
            }
          >
            <div className="flex justify-center items-center gap-3">
              <img src={i.imgURL} alt="" className="w-[51px] h-[51px]" />
              <div className="text-[14px]">
                <p className="">{i.artist}</p>
                <p>{i.song}</p>
              </div>
            </div>
            <input
              type="checkbox"
              value={i.id}
              onChange={inputValue}
              checked={targetId === i.id ? true : false}
              // disabled={targetId === i.id ? true : false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
