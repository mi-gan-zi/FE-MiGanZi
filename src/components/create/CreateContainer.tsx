import React, { useEffect, useState } from "react";
import MusicSelect from "./MusicSelect";
import CreateHeader from "./CreateHeader";
import ImageUpLoad from "./ImageUpLoad";
import Description from "./Description";

export type CreateMiganziType = "music" | "image" | "description";

export default function Container() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
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

  useEffect(() => {
    console.log("Playing state updated:", playing);
  }, [playing]);
  return (
    <>
      <CreateHeader goNextStep={goNextStep} goBackStep={goBackStep} />
      {currentStep === "music" && (
        <MusicSelect
          playing={playing}
          setPlaying={setPlaying}
          currentStep={currentStep}
        />
      )}
      {currentStep === "image" && <ImageUpLoad />}
      {currentStep === "description" && <Description />}
    </>
  );
}
