import result from "../../assets/no_result.svg";

export default function NoSearchResult() {
  return (
    <div className="mb-[6rem] py-[20px] flex flex-col justify-center items-center">
      <img alt="" src={result} />
      <p className="text-lg font-semibold text-[#3D3D3D]">
        검색 값에 맞는 아티클이 없어요.
      </p>
      <p className="mt-6 text-[#8B8B8B]">다른 키워드를 검색해보거나,</p>
      <p className="mb-6 text-[#8B8B8B]">
        필터 초기화를 통해 미(간)지를 탐색해보세요.
      </p>
    </div>
  );
}
