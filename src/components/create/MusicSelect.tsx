import Player from "components/common/player/Player";
import React, { useRef, useState } from "react";
import MadeleineLove from "assets/music/MadeleineLove.mp3";
import Winter from "assets/music/Winter.mp3";
import sawal from "assets/music/sawal.mp3";
import single from "assets/music/single.mp3";
import feel from "assets/music/feel.mp3";
export default function MusicSelect() {
  const [song, setSong] = useState<string>();
  const [artist, setArtist] = useState<string>("");
  const [playTitle, setPlayTitle] = useState();
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
    console.log(res);
    const propsValue = playList.filter((id) => {
      if (id.id === parseInt(res)) {
        setArtist(id.artist);
        setSong(id.song);
        setPlayTitle(id.playList);
      }
    });
    console.log(propsValue);
    // setArtist(propsValue.artist)
  };
  console.log("com", MadeleineLove);
  console.log("ss", playTitle);
  return (
    <div>
      <h1 className="text-[20px] font-bold p-5">게시글의 첨부할 음악선택</h1>
      <Player playList={playTitle} song={song} artist={artist} />
      {/* //빈지노의 브레이크
      //한요한의 따릉에 */}
      <ul>
        {playList.map((i) => (
          <li
            key={i.id}
            className="flex border-b-st-gray-04 border-b-[1px] justify-between px-5 py-2"
          >
            <div className="flex justify-center items-center gap-3">
              <img src={i.imgURL} alt="" className="w-[51px] h-[51px]" />
              <div className="text-[14px]">
                <p className="">{i.artist}</p>
                <p>{i.song}</p>
              </div>
            </div>
            <input type="checkbox" value={i.id} onChange={inputValue} />
          </li>
        ))}
      </ul>
    </div>
  );
}
