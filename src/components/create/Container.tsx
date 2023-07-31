import Pre from "../../assets/pre.svg";

export default function Container() {
  //TODO: 중복보내기 방지

  return (
    <>
      <div className="w-full pb-4 flex items-center justify-between px-5 border-b-[1px] border-st-gray-03">
        <div className="flex">
          <img src={Pre} alt={"img"} />
          <p className="translate-x-4 font-bold">게시글 작성</p>
        </div>
        <div>
          <button>다음</button>
        </div>
      </div>
    </>
  );
}
