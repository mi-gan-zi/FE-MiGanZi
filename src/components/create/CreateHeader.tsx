// CreateHeader.tsx
import Pre from "assets/pre.svg";
import { CreateMiganziType } from "./CreateContainer";

interface CreateHeaderProps {
  goBackStep: () => void;
  goNextStep: () => void;
  createPost: (e: any) => Promise<void>;
  isImage: boolean;
  currentStep: CreateMiganziType;
  mapMarkValue: Object | undefined;
}

const CreateHeader = ({
  goNextStep,
  goBackStep,
  isImage,
  currentStep,
  mapMarkValue,
  createPost,
}: CreateHeaderProps) => {
  return (
    <div className="w-full pb-4 flex-col items-center justify-between px-5 border-b-[1px] border-st-gray-03">
      <div className="flex justify-between">
        <div
          className="flex cursor-pointer"
          onClick={() => {
            goBackStep();
          }}
        >
          <img src={Pre} alt={"img"} />
          <p className="translate-x-4 font-bold">게시글 작성</p>
        </div>
        <div>
          <button
            onClick={() => {
              if (currentStep === "image") {
                isImage ? goNextStep() : alert("이미지는 꼭 넣어주세요 ☺");
              } else {
                goNextStep();
              }
            }}
          >
            {mapMarkValue ? <div onClick={createPost}>저장</div> : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateHeader;
