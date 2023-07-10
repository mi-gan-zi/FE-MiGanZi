import MadeleineLove from "assets/music/MadeleineLove.mp3";
import Winter from "assets/music/Winter.mp3";
import sawal from "assets/music/sawal.mp3";
import single from "assets/music/single.mp3";
import feel from "assets/music/feel.mp3";

export interface Music {
    id: number;
    song: string;
    artist: string;
    imgURL: string;
    playList: any; //myp3의 파일의 타입???
}
  
export const musicList: Music[] = [
    {
        id: 1,
        song: "Madeleine_Love",
        artist: "CHEEZE(치즈)",
        imgURL:
          "https://image.bugsm.co.kr/album/images/original/5031/503179.jpg?version=undefined",
        playList: MadeleineLove,
    } as Music,
    {
        id: 2,
        song: "A Winter Story",
        artist: "Remedios",
        imgURL:
          "https://image.bugsm.co.kr/album/images/original/3580/358032.jpg?version=undefined",
        playList: Winter,
    } as Music,
    {
        id: 3,
        song: "7102",
        artist: "김 사월",
        imgURL:
          "https://image.bugsm.co.kr/album/images/original/201302/20130242.jpg?version=undefined",
        playList: sawal,
    } as Music,
    {
        id: 4,
        song: "민들레",
        artist: "우효(OOHYO)",
        imgURL:
          "https://image.bugsm.co.kr/album/images/original/201002/20100227.jpg?version=undefined",
        playList: single,
    } as Music,
    {
        id: 5,
        song: "Feel Alright",
        artist: "짙은",
        imgURL:
          "https://image.bugsm.co.kr/album/images/original/2263/226380.jpg?version=undefined",
        playList: feel,
    } as Music,
];
  