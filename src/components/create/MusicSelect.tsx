import Player from "components/common/player/Player";
import { Dispatch, SetStateAction, useState } from "react";

import { CreateMiganziType } from "./CreateContainer";
import { playList } from "./MusicDataList";
//TODO: custom hook
// import PlayerCon from "./testPlayer/PlayerCon";

interface PropsType {
  currentStep: CreateMiganziType;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setMusicValue: Dispatch<SetStateAction<string>>;
}
export default function MusicSelect({
  playing,
  setPlaying,
  setMusicValue,
}: PropsType) {
  const [playlistItem, setPlaylistItem] = useState({
    song: "",
    artist: "",
    playList: "",
    targetId: 0,
    imgURL: "",
  });

  const inputValue = (event: any) => {
    const res = event.target?.value;
    const selectedPlaylistItem = playList.find(
      (item) => item.id === parseInt(res)
    );

    if (selectedPlaylistItem) {
      setPlaylistItem({
        song: selectedPlaylistItem.song,
        artist: selectedPlaylistItem.artist,
        playList: selectedPlaylistItem.playList,
        targetId: selectedPlaylistItem.id,
        imgURL: selectedPlaylistItem.imgURL,
      });
      setPlaying(false);
      setMusicValue(selectedPlaylistItem.id.toString());
    }
  };

  return (
    <div>
      <h1 className="text-[20px] font-bold p-5">게시글의 첨부할 음악선택</h1>
      <Player
        playing={playing}
        setPlaying={setPlaying}
        playList={playlistItem.playList}
        song={playlistItem.song}
        artist={playlistItem.artist}
        imgURL={playlistItem.imgURL}
        targetId={playlistItem.targetId}
      />
      <ul className="py-10 px-4">
        {playList.map((i) => (
          <li
            key={i.id}
            className={
              `flex border-b-st-gray-04 border-b-[1px] justify-between px-5 py-2 ` +
              (i.id === playlistItem.targetId ? " " : "opacity-50 disabled")
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
              checked={playlistItem.targetId === i.id ? true : false}
            />
          </li>
        ))}
      </ul>
      {/* TODO: custom hook */}
      {/* <PlayerCon
        playing={playing}
        setPlaying={setPlaying}
        playList={playTitle}
        song={song}
        artist={artist}
        imgURL={imgURL}
        targetId={targetId}
      /> */}
    </div>
  );
}
