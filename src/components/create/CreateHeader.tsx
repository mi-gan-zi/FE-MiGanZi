import Pre from "assets/pre.svg";
import { CreateMiganziType } from "./CreateContainer";
import { Dispatch, SetStateAction } from "react";
type SetMarker = Dispatch<
  SetStateAction<
    | {
        lat: string;
        lng: string;
      }
    | undefined
  >
>;
interface CreateHeaderProps {
  goBackStep: () => void;
  goNextStep: () => void;
  createPost: (e: any) => Promise<void>;
  setImageValue: Dispatch<SetStateAction<any>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setIsImage: Dispatch<SetStateAction<boolean>>;
  setMapMarkValue: SetMarker;
  isImage: boolean;
  currentStep: CreateMiganziType;
  mapMarkValue: Object | undefined;
  isLoading: boolean;
}

const CreateHeader = ({
  goNextStep,
  goBackStep,
  createPost,
  setImageValue,
  setMapMarkValue,
  setPlaying,
  setIsImage,
  currentStep,
  mapMarkValue,
  isLoading,
  isImage,
}: CreateHeaderProps) => {
  const goNextStepHandler = async () => {
    if (currentStep === "image") {
      isImage ? goNextStep() : alert("이미지는 꼭 넣어주세요 ☺");
    } else {
      await setPlaying(false);
      goNextStep();
    }
  };
  const goBackStepHandler = () => {
    currentStep === "image" && setImageValue("");
    currentStep === "description" && setMapMarkValue(undefined);
    setIsImage(false);
    goBackStep();
  };
  return (
    <div className="w-full pb-4 flex-col items-center justify-between px-5 border-b-[1px] border-st-gray-03 mt-4">
      <div className="flex justify-between">
        <div className="flex cursor-pointer" onClick={goBackStepHandler}>
          <img src={Pre} alt={"img"} />
          <p className="translate-x-4 font-bold">게시글 작성</p>
        </div>
        <div>
          <button onClick={goNextStepHandler}>
            {isLoading ? (
              "저장중.."
            ) : (
              <>
                {mapMarkValue ? <div onClick={createPost}>저장</div> : "다음"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateHeader;
