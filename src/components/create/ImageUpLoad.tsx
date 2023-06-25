import { UpLoadIcon } from "assets/Icon";
import React, { DragEvent, useCallback, useRef, useState } from "react";

export default function ImageUpLoad() {
  const [img, setImg] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);

  const handleCreateIMG = (e: any) => {
    const dropFile = e.dataTransfer.files[0];
    const file = ref.current?.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else if (dropFile) {
      reader.readAsDataURL(dropFile);
    }
  };

  const handleDrop = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    handleCreateIMG(e);
  }, []);

  return (
    <div>
      <h1 className="text-[20px] font-semibold">업로드할 사진 선택</h1>
      <div
        className={
          "pre-img w-[350px] h-[467px] flex-col justify-center items-center flex " +
          (img ? "" : "border-dashed border-st-gray-05 border-[1px] rounded-lg")
        }
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e: DragEvent) => handleDrop(e)}
      >
        {img ? (
          <img
            src={img}
            alt=""
            className=" max-w-xl rounded-md w-full h-auto aspect-[3/4] object-cover"
          />
        ) : (
          <div className="items-center justify-center flex-col flex gap-1">
            <div className="opacity-50 flex items-center flex-col">
              <UpLoadIcon />
              <p className="text-[#007DF0] text-[18px] font-bold ">
                사진 업로드
              </p>
            </div>
            <div className=" flex-col flex justify-center items-center">
              <p>당신만 아는 장소를 업로드 해주세요</p>
              <p>3:4 비율 사진을 추천해요.</p>
            </div>
          </div>
        )}
      </div>
      <label
        className="block w-[350px] h=[50px] py-2 rounded-lg text-center bg-st-gray-05 text-st-white mt-3"
        htmlFor="file-upload"
      >
        사진 업로드
      </label>
      <input
        type="file"
        className="hidden"
        id="file-upload"
        onChange={handleCreateIMG}
        ref={ref}
      />
      <button
        onClick={() => {
          setImg("");
        }}
      >
        취소
      </button>
    </div>
  );
}
