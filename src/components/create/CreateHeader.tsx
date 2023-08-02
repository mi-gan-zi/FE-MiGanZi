// CreateHeader.tsx
import Pre from "assets/pre.svg";

interface CreateHeaderProps {
  goBackStep: () => void;
  goNextStep: () => void;
}

const CreateHeader = ({ goNextStep, goBackStep }: CreateHeaderProps) => {
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
          <button onClick={() => goNextStep()}>다음</button>
        </div>
      </div>
    </div>
  );
};

export default CreateHeader;
