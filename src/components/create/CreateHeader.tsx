import Pre from "assets/pre.svg";
import { CreateMiganziType } from "./CreateContainer";
import { Dispatch, SetStateAction } from "react";

interface CreateHeaderProps {
  goBackStep: () => void;
  goNextStep: () => void;
  createPost: (e: any) => Promise<void>;
  setImageValue: Dispatch<SetStateAction<any>>;
  isImage: boolean;
  currentStep: CreateMiganziType;
  mapMarkValue: Object | undefined;
  isLoading: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
}

const CreateHeader = ({
  goNextStep,
  goBackStep,
  isImage,
  currentStep,
  mapMarkValue,
  createPost,
  isLoading,
  setImageValue,
  setPlaying,
}: CreateHeaderProps) => {
  return (
    <div className="w-full pb-4 flex-col items-center justify-between px-5 border-b-[1px] border-st-gray-03 mt-4">
      <div className="flex justify-between">
        <div
          className="flex cursor-pointer"
          onClick={() => {
            currentStep === "image" && setImageValue("");
            goBackStep();
          }}
        >
          <img src={Pre} alt={"img"} />
          <p className="translate-x-4 font-bold">게시글 작성</p>
        </div>
        <div>
          <button
            onClick={async () => {
              if (currentStep === "image") {
                isImage ? goNextStep() : alert("이미지는 꼭 넣어주세요 ☺");
              } else {
                await setPlaying(false);
                goNextStep();
              }
            }}
          >
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
