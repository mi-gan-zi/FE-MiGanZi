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
import { Cropper, ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  setIsImage: Dispatch<SetStateAction<boolean>>;
  setImageValue?: Dispatch<SetStateAction<string>>;
  imageValue: any;
};

export default function ImageUpLoad({
  setIsImage,
  setImageValue,
  imageValue,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [preImage, setPreImage] = useState<any>();
  const [image, setImage] = useState<null | string>(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  useEffect(() => {}, []);
  const imageSizeAlert = (type: string) => {
    type === "size" && alert("이미지 사이즈는 10메가 이하로 해주세요 😡");
    type === "width" && alert("이미지 가로확인 😡");
    type === "height" && alert("이미지 세로확인 😡");
  };

  const handleCreateIMG = (e: any) => {
    const dropFile = e.dataTransfer?.files[0];
    const file = ref.current?.files?.[0];
    const reader = new FileReader();
    const maxSizeInBytes = 10 * 1024 * 1024;
    reader.onloadend = () => {
      setImage(reader?.result as string);
      // if (setImageValue) {
      //   setPreImage(reader?.result);
      // }
    };
    console.log(preImage);
    const checkAndReadImage = (imageFile: File) => {
      if (imageFile.size > maxSizeInBytes) imageSizeAlert("size");

      reader.readAsDataURL(imageFile);
      setIsImage(true);
    };
    if (file) {
      checkAndReadImage(file);
    }

    if (dropFile) {
      checkAndReadImage(dropFile);
    }
  };

  useEffect(() => {
    const imageType = new Image();
    imageType.src = preImage;

    imageType.onload = () => {
      const width = imageType.naturalWidth;
      const height = imageType.naturalHeight;
      console.log("가로해상도", width);
      console.log("세로해상도", height);
      if (width && width < 350) imageSizeAlert("width");
      if (height && height < 467) imageSizeAlert("height");
    };
  }, [preImage, image]);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setImage(null);
      const file = base64toFile(
        cropperRef.current?.cropper.getCroppedCanvas().toDataURL(),
        "image_file.png"
      );

      //@ts-ignore
      setImageValue(file);
      setPreImage(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  function base64toFile(base_data: any, filename: any) {
    let arr = base_data.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

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
        {image ? null : (
          <>
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
                  className=" max-w-xl rounded-md w-full h-auto aspect-[3/4] object-cover "
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
              {imageValue ? "다른 사진 선택" : "사진 업로드"}
            </label>
          </>
        )}
        {image && (
          <div className="container">
            <div className="backdrop" />
            <div className="modal">
              <div className="content-wrapper">
                <div className="content">
                  <Cropper
                    id="CropperId"
                    ref={cropperRef}
                    src={image}
                    viewMode={2}
                    zoomOnWheel={false}
                    zoomOnTouch={false}
                    zoomable={false}
                    scalable={false}
                    checkOrientation={false}
                    aspectRatio={3 / 4}
                  />
                </div>
              </div>
              <div className="footer my-[10px] flex justify-center gap-2">
                <button
                  className="bg-[#1e90ff] hover:bg-[#70a1ff] text-[#ffffff]  py-2 px-4  border border-[#1e90ff] rounded"
                  onClick={() => setImage(null)}
                >
                  취소
                </button>
                <button
                  className="crop bg-[#1e90ff] hover:bg-[#70a1ff] text-[#ffffff]  py-2 px-4 border border-[#1e90ff] rounded"
                  onClick={getCropData}
                >
                  적용
                </button>
              </div>
            </div>
          </div>
        )}

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
