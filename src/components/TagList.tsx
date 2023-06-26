import TagButton from "./TagButton";
import { tagList } from "../types/tag.type";

const TagList = () => {
  const arr = new Array<string>();
  const handleSelect = (isClicked: boolean, text: string) => {
    if (isClicked === true) {
      arr.push(text);
    }
    if (isClicked === false) {
      let index = arr.indexOf(text);
      arr.splice(index, 1);
    }
    // TODO: 서버에 요청 & 결과 렌더링
  };
  return (
    <div className="mb-5">
      <ul className="px-[20px] grid grid-rows-3 grid-flow-col gap-2">
        {tagList.map((item) => (
          <li>
            <TagButton key={item.id} text={item.name} handleSelect={handleSelect} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
