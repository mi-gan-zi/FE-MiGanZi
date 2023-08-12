import { useState } from "react";
import MusicSelect from "./MusicSelect";
import CreateHeader from "./CreateHeader";
import ImageUpLoad from "./ImageUpLoad";
import Description from "./Description";
import { localTokenRepoInstance } from "repository/LocalTokenRepository";
import { useMutation } from "@tanstack/react-query";
import { postBoard } from "services/apis/miganziService";
import { useNavigate } from "react-router-dom";

export type CreateMiganziType = "music" | "image" | "description";
export interface CreateFormDataType {
  music_id: string;
  imageFile: string;
  tags: string;
  content: string;
  map: {
    position: { lat: string; lng: string };
    content: string;
  };
}
export default function Container() {
  const steps: CreateMiganziType[] = ["music", "image", "description"];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  const [playing, setPlaying] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [musicValue, setMusicValue] = useState("0");
  const [imageValue, setImageValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [mapMarkValue, setMapMarkValue] = useState<{
    lat: string;
    lng: string;
  }>();
  const [keyWord, setKeyWord] = useState("");
  const [stepData, setStepData] = useState<CreateFormDataType>();
  const navigate = useNavigate();
  const createMutation = useMutation({
    mutationFn: postBoard,
    onSuccess: () => {
      alert("게시글 업로드에 성공하셨습니다!");
      navigate("/");
    },
    onError: () => {
      alert("서버에서 에러가 났어요 😡");
    },
  });
  const isLoading = createMutation.isLoading;

  const goNextStep = () => {
    setPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((index) => index + 1);
    }
  };

  const goBackStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((index) => index - 1);
    }
  };
  const addFormDataHandler = (data: CreateFormDataType) => {
    setStepData((pre) => ({ ...pre, ...data }));
  };
  const createPost = async (e: any) => {
    const formData = new FormData();
    e.preventDefault();

    formData.append("content", contentValue);
    //@ts-ignore
    formData.append("lat", mapMarkValue?.lat);
    //@ts-ignore
    formData.append("lng", mapMarkValue?.lng);
    formData.append("tags", tagValue);
    formData.append("address_name", keyWord);
    formData.append("music_id", musicValue);
    if (imageValue) {
      formData.append("imageFile", imageValue);
    }
    createMutation.mutate(formData);
  };

  return (
    <>
      <CreateHeader
        goNextStep={goNextStep}
        goBackStep={goBackStep}
        currentStep={currentStep}
        mapMarkValue={mapMarkValue}
        setMapMarkValue={setMapMarkValue}
        createPost={createPost}
        setImageValue={setImageValue}
        setPlaying={setPlaying}
        setIsImage={setIsImage}
        isLoading={isLoading}
        isImage={isImage}
      />
      {currentStep === "music" && (
        <MusicSelect
          playing={playing}
          setPlaying={setPlaying}
          currentStep={currentStep}
          setMusicValue={setMusicValue}
        />
      )}
      {currentStep === "image" && (
        <ImageUpLoad
          setIsImage={setIsImage}
          setImageValue={setImageValue}
          imageValue={imageValue}
        />
      )}
      {currentStep === "description" && (
        <Description
          mapMarkValue={mapMarkValue}
          setTagValue={setTagValue}
          setMapMarkValue={setMapMarkValue}
          setContentValue={setContentValue}
          setKeyWord={setKeyWord}
          keyWord={keyWord}
        />
      )}
    </>
  );
}
