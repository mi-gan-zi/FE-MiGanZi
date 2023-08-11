import React, { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface ImageCropperProps {
  src: string;
  onCrop: (croppedImage: string) => void;
}

const ImageCropper = ({ src, onCrop }: ImageCropperProps) => {
  const cropperRef = useRef<ReactCropperElement>(null);


  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedImage = cropperRef.current;
      console.log("crop : ", croppedImage);
      //   onCrop(croppedImage);
    }
  };

  return (
    <div>
      <Cropper
        ref={cropperRef}
        src={src}
        style={{ height: 400, width: "100%" }}
        aspectRatio={1} // 이미지의 종횡비 설정
        guides={true} // 가이드 라인 표시 여부
        viewMode={1} // 뷰 모드 설정 (0, 1, 2, 3 중 선택)
      />
      <button onClick={handleCrop}>Crop Image</button>
    </div>
  );
};

export default ImageCropper;

