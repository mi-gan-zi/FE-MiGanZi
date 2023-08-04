import { useEffect, useState } from "react";

interface PlayerHookStateType {
  current: number;
  totalTime: number;
  ratio: number;
  playing: boolean;
  onStartPlay: () => void;
  onStopPlay: () => void;
}

const usePlayer = (playList: any, targetId?: number): PlayerHookStateType => {
  const [totalTime, setTotalTime] = useState(0);
  const [current, setCurrentTime] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [ratio, setRatio] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const newAudio = new Audio(playList);
    setAudio(newAudio);
    return () => {
      newAudio.pause();
    };
  }, [playList]);

  useEffect(() => {
    if (audio && playing) {
      playing ? audio.play() : audio.pause();
      setTotalTime(audio.duration);
      const updateTime = () => {
        setCurrentTime(audio.currentTime);
        setRatio((audio.currentTime / audio.duration) * 100);
        if (audio.duration === audio.currentTime) {
          setPlaying(false);
        }
      };
      audio.addEventListener("timeupdate", updateTime);
      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [playing, targetId, audio]);

  const onStartPlay = () => {
    setPlaying(true);
  };

  const onStopPlay = () => {
    if (playing) {
      setPlaying(false);
    }
  };

  return { current, totalTime, ratio, playing, onStartPlay, onStopPlay };
};

export default usePlayer;
