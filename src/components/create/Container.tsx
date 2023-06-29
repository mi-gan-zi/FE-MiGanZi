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
  /**image 파일 선택 여부 -> 헤더 다음으로 막기 위함 */
  const [image, setImage] = useState(false);
  /**image 파일 담기 위한 state */
  const [imageFile, setImageFile] = useState<any>();
  const [mark, setMarkes] = useState<MarkType>({ lat: "1", lng: "1" });
  const [tags, setTags] = useState<string[]>([]);
  const [seletTags, setSeletTags] = useState<string>("000000000000");
  const [content, setContent] = useState<string>("-");

  const navigate = useNavigate();

  useEffect(() => {
    if (nextMove < 1) {
      setNextMove(1);
    } else if (nextMove > 3) {
      setNextMove(3);
    }
  }, [nextMove]);

  function updateValue(a: string, b: string[]) {
    const arr = a.split(""); // 문자열을 배열로 변환
    b.forEach((index: string) => {
      arr[parseInt(index)] = "1"; // 특정 인덱스 값을 "1"로 변경
    });
    return setSeletTags(arr.join("")); // 배열을 문자열로 변환하여 리턴
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
      const res = await axios.post(
        process.env.REACT_APP_ENDPOINT + "user/board/post",
        formData,
        { headers }
      );
      console.log(res);
      if (res.data === "OK") {
        alert("게시글 업로드에 성공하셨습니다!");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head image={image} setNextMove={setNextMove} />
      <form onSubmit={testMapDataHandle} encType="multipart/form-data">
        {nextMove === 1 && <MusicSelect setMusicId={setMusicId} />}
        {nextMove === 2 && (
          <ImageUpLoad setImage={setImage} setImageFile={setImageFile} />
        )}
        {nextMove === 3 && (
          <Description
            testMapDataHandle={testMapDataHandle}
            setMarkes={setMarkes}
            setTags={setTags}
            setContent={setContent}
          />
        )}
      </form>
    </>
  );
}
