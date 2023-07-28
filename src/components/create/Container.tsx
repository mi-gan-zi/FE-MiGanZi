import React, { useEffect, useState } from "react";
import ImageUpLoad from "./ImageUpLoad";
import Head from "./Head";
import Description from "./Description";
import MusicSelect from "./MusicSelect";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { reissueToken } from "utils/axiosConfig";
export interface MarkType {
  lat: string;
  lng: string;
}

export default function Container() {
  const [nextMove, setNextMove] = useState<number>(1);
  const [keyWord, setKeyWord] = useState("");
  /**
   * musicID = 0 -> 음악 X
   * 1~5까지 음악
   */
  const [musicId, setMusicId] = useState<string>("0");
  const [image, setImage] = useState(false);
  const [imageFile, setImageFile] = useState<any>();
  const [mark, setMarkes] = useState<MarkType>({ lat: "1", lng: "1" });
  const [tags, setTags] = useState<string[]>([]);
  const [seletTags, setSeletTags] = useState<string>("000000000000");
  const [content, setContent] = useState<string>("-");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (nextMove < 1) {
      setNextMove(1);
    } else if (nextMove > 3) {
      setNextMove(3);
    }
  }, [nextMove]);

  function updateValue(a: string, b: string[]) {
    const arr = a.split("");
    b.forEach((index: string) => {
      arr[parseInt(index)] = "1";
    });
    return setSeletTags(arr.join(""));
  }

  const testMapDataHandle = async (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <Head
        nextMove={nextMove}
        image={image}
        setNextMove={setNextMove}
        testMapDataHandle={testMapDataHandle}
        isLoading={isLoading}
      />
      {nextMove === 1 && <MusicSelect setMusicId={setMusicId} />}
      {nextMove === 2 && (
        <ImageUpLoad setImage={setImage} setImageFile={setImageFile} />
      )}
      {nextMove === 3 && (
        <Description
          setMarkes={setMarkes}
          setTags={setTags}
          setContent={setContent}
        />
      )}
    </>
  );
}
