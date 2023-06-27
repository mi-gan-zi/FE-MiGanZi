import Player from "components/common/player/Player";
import React, { useRef, useState } from "react";
import MadeleineLove from "assets/music/MadeleineLove.mp3";
import Winter from "assets/music/Winter.mp3";
import sawal from "assets/music/sawal.mp3";
import single from "assets/music/single.mp3";
import feel from "assets/music/feel.mp3";
export default function MusicSelect() {
  const [playing, setPlaying] = useState(false);
  const [song, setSong] = useState<string>();
  const [artist, setArtist] = useState<string>("");
  const [playTitle, setPlayTitle] = useState();
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [targetId, setTargetId] = useState<number>();
  const [imgURL, setImgURL] = useState<string>();
  const refList = useRef<HTMLInputElement>(null);
  const playList = [
    {
      id: 1,
      song: "Madeleine_Love",
      artist: "CHEEZE(치즈)",
      imgURL:
        "https://image.bugsm.co.kr/album/images/original/5031/503179.jpg?version=undefined",
      playList: MadeleineLove,
    },
    {
      id: 2,
      song: "A Winter Story",
      artist: "Remedios",
      imgURL:
        "https://image.bugsm.co.kr/album/images/original/3580/358032.jpg?version=undefined",
      playList: Winter,
    },
    {
      id: 3,
      song: "7102",
      artist: "김 사월",
      imgURL:
        "https://image.bugsm.co.kr/album/images/original/201302/20130242.jpg?version=undefined",
      playList: sawal,
    },
    {
      id: 4,
      song: "민들레",
      artist: "우효(OOHYO)",
      imgURL:
        "https://image.bugsm.co.kr/album/images/original/201002/20100227.jpg?version=undefined",
      playList: single,
    },
    {
      id: 5,
      song: "Feel Alright",
      artist: "짙은",
      imgURL:
        "https://image.bugsm.co.kr/album/images/original/2263/226380.jpg?version=undefined",
      playList: feel,
    },
  ];
  const inputValue = (e: any) => {
    const res = e.target?.value;
    setTargetId(parseInt(res));
    const isChecked = e.target.checked;
    playList.filter((id) => {
      if (id.id === parseInt(res)) {
        setArtist(id.artist);
        setSong(id.song);
        setPlayTitle(id.playList);
        setImgURL(id.imgURL);
        setIsCheck(isChecked);
        setPlaying(false);
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
        setIsCheck={setIsCheck}
        targetId={targetId}
      />
      {/* //빈지노의 브레이크
      //한요한의 따릉에 */}
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
