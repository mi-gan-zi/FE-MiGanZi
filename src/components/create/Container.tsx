import React, { useEffect, useState } from "react";
import ImageUpLoad from "./ImageUpLoad";
import Head from "./Head";
import Description from "./Description";
import MusicSelect from "./MusicSelect";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  //TODO: geonavigator 이용해서 초기값 설정
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

    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
      processData: false,
    };
    const formData = new FormData();
    const nickname = localStorage.getItem("nickname");

    updateValue(seletTags, tags);
    formData.append("imageFile", imageFile);
    formData.append("lat", mark.lat);
    formData.append("lng", mark.lng);
    formData.append("content", content);
    formData.append("music_id", musicId);
    formData.append("tags", seletTags);
    nickname && formData.append("nickname", nickname);
    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_ENDPOINT + "user/board/post/write",
        formData,
        { headers }
      );
      console.log("5", response);

      alert("게시글 업로드에 성공하셨습니다!");
      navigate("/");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
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
