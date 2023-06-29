import { useState } from "react";

const TagButton = ({
  id,
  text,
  handleSelect,
  onClickMark,
}: {
  id: number;
  text: string;
  handleSelect: (isClicked: boolean, text: string) => void;
  onClickMark: (id: number, isClicked: boolean) => void;
}) => {
  const [isClicked, setIsClicked] = useState(false);

  let textColor = isClicked ? "text-[#ffffff]" : "text-[#6f6f6f]";
  let bgColor = isClicked ? "bg-[#007DF0]" : "bg-white";
  let borderColor = isClicked ? "border-[#007DF0]" : "border-[#6f6f6f]";

  const handleClick = () => {
    setIsClicked(!isClicked);
    handleSelect(!isClicked, text);
    onClickMark(id, isClicked);
  };

  return (
    <button
      className={`px-2.5 py-1 text-xs font-semibold ${textColor} rounded-[50px] border ${borderColor} ${bgColor}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default TagButton;
