import React, { useEffect, useState } from "react";
import MusicSelect from "./MusicSelect";
import CreateHeader from "./CreateHeader";
import ImageUpLoad from "./ImageUpLoad";
import Description from "./Description";

export type CreateMiganziType = "music" | "image" | "description";

export default function Container() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [musicValue, setMusicValue] = useState("");
  const [imageValue, setImageValue] = useState<string | ArrayBuffer | null>("");
  const [tagValue, setTagValue] = useState<string>();
  const [contentValue, setContentValue] = useState("");
  const [mapMarkValue, setMapMarkValue] = useState({});
  const formData = new FormData();
  console.log(imageValue);
  console.log(musicValue);
  console.log(tagValue);
  console.log(contentValue);
  console.log(mapMarkValue);
  const steps: CreateMiganziType[] = ["music", "image", "description"];
  const currentStep = steps[currentStepIndex];
  //TODO: 중복보내기 방지
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

  return (
    <>
      <CreateHeader
        goNextStep={goNextStep}
        goBackStep={goBackStep}
        isImage={isImage}
        currentStep={currentStep}
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
        <ImageUpLoad setIsImage={setIsImage} setImageValue={setImageValue} />
      )}
      {currentStep === "description" && (
        <Description
          setTagValue={setTagValue}
          setMapMarkValue={setMapMarkValue}
          setContentValue={setContentValue}
        />
      )}
    </>
  );
}
