import { UpLoadIcon } from "assets/Icon";
import {
  Dispatch,
  DragEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  setIsImage: Dispatch<SetStateAction<boolean>>;
  setImageValue?: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
  imageValue: any;
};

export default function ImageUpLoad({
  setIsImage,
  setImageValue,
  imageValue,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [preImage, setPreImage] = useState<any>();

  useEffect(() => {}, []);
  const imageSizeAlert = () => {
    alert("이미지 사이즈는 10메가 이하로 해주세요 😡");
  };

  const handleCreateIMG = (e: any) => {
    const dropFile = e.dataTransfer?.files[0];
    const file = ref.current?.files?.[0];
    const reader = new FileReader();
    const maxSizeInBytes = 10 * 1024 * 1024;
    reader.onloadend = () => {
      if (setImageValue) {
        setImageValue(e.target.files[0]);
        setPreImage(reader?.result);
      }
    };
    const checkAndReadImage = (imageFile: File) => {
      if (imageFile.size > maxSizeInBytes) {
        imageSizeAlert();
      } else {
        reader.readAsDataURL(imageFile);
        setIsImage(true);
      }
    };
    if (file) {
      checkAndReadImage(file);
    }

    if (dropFile) {
      checkAndReadImage(dropFile);
    }
  };
  const handleDrop = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    handleCreateIMG(e);
  }, []);
  return (
    <div>
      <div className="w-[350px] h-[70px] font-bold text-xl flex items-center px-5">
        <h1>업로드할 사진 선택</h1>
      </div>
      <div className=" w-[390px] flex flex-col justify-center items-center">
        <div
          className={
            "pre-img w-[350px] h-[467px] flex-col justify-center items-center flex " +
            (preImage
              ? ""
              : "border-dashed border-st-gray-05 border-[1px] rounded-lg")
          }
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e: DragEvent) => handleDrop(e)}
        >
          {preImage ? (
            <img
              src={preImage}
              alt=""
              className=" max-w-xl rounded-md w-full h-auto aspect-[3/4] object-cover"
            />
          ) : (
            <div
              className="items-center justify-center flex-col flex gap-1 cursor-pointer"
              onClick={() => ref.current?.click()}
            >
              <div className="opacity-50 flex items-center flex-col">
                <UpLoadIcon />
                <p className="text-[#007DF0] text-[18px] font-bold mt-[14px] mb-[29px]">
                  사진 업로드
                </p>
              </div>
              <div className=" flex-col flex justify-center items-center text-st-gray-06 text-base font-medium">
                <p>당신만 아는 장소를 선택 또는 드래그 해주세요</p>
                <p>3:4 비율 사진을 추천해요.</p>
              </div>
            </div>
          )}
        </div>
        <label
          className={
            "block w-[350px] h=[50px] py-2 rounded-lg text-center " +
            (imageValue
              ? " bg-st-gray-05 text-st-white mt-3 cursor-pointer mb-[120px]"
              : "bg-active-blue text-st-white mt-3 cursor-pointer mb-[120px]")
          }
          htmlFor="file-upload"
        >
          {imageValue ? "다른 사진 선택" : "사진 업로드"}{" "}
        </label>
        <input
          type="file"
          className="hidden"
          id="file-upload"
          onChange={handleCreateIMG}
          ref={ref}
        />
        {/* <button
          onClick={() => {
            setImg("");
          }}
        >
          취소
        </button> */}
      </div>
    </div>
  );
}
