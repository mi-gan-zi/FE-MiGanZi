import { Dispatch, SetStateAction } from "react";
import PlayerUI from "./PlayerUI";
import usePlayer from "./usePlayer";

interface PlayerProps {
  playList: any;
  targetId?: number;
  playing?: boolean;
  setPlaying: Dispatch<SetStateAction<any>>;
  song?: string;
  artist?: string;
  imgURL?: string;
}

const PlayerCon = (props: PlayerProps) => {
  const { playList, targetId, setPlaying, song, artist, imgURL } = props;
  const { current, totalTime, ratio, onStartPlay, onStopPlay, playing } =
    usePlayer(playList, targetId);
  return (
    <PlayerUI
      {...props}
      current={current}
      totalTime={totalTime}
      ratio={ratio}
      onStartPlay={onStartPlay}
      onStopPlay={onStopPlay}
      playing={playing}
      setPlaying={setPlaying}
      song={song}
      artist={artist}
      imgURL={imgURL}
      targetId={targetId}
    />
  );
};

export default PlayerCon;
