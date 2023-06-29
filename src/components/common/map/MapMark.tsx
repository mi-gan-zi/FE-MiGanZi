import { useRef, useState } from "react";
import { DrawingManager, Map, MapMarker } from "react-kakao-maps-sdk";

const MapMark = () => {
  type DrawingManagerType =
    /*global kakao*/
    kakao.maps.drawing.DrawingManager<kakao.maps.drawing.OverlayType.MARKER>;

  const managerRef = useRef<DrawingManagerType>(null);
  const [marker, setMarker] = useState(true);
  const [overlayData, setOverlayData] = useState<
    ReturnType<DrawingManagerType["getData"]>
  >({
    arrow: [],
    circle: [],
    ellipse: [],
    marker: [],
    polygon: [],
    polyline: [],
    rectangle: [],
  });

  function selectOverlay(type: kakao.maps.drawing.OverlayType.MARKER) {
    const manager = managerRef.current;
    manager && manager.cancel();
    manager && manager.select(type);
    setMarker(false);
  }

  function drawOverlayData() {
    const manager = managerRef.current;
    console.log(manager?.getData().marker[0].x);
    console.log(manager?.getData().marker[0].y);
    manager && setOverlayData(manager.getData());
    searchAddrFromCoords(manager);
    // 주소-좌표 변환 객체를 생성합니다
  }

  function searchAddrFromCoords(manager: any) {
    const geocoder = new kakao.maps.services.Geocoder();
    console.log(geocoder);
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2Address(
      manager?.getData().marker[0].x,
      manager?.getData().marker[0].y,
      (result: any) => console.log(result[0].address.address_name)
    );
  }

  return (
    <>
      <Map
        onClick={() => setTimeout(() => drawOverlayData(), 500)}
        center={{
          // 지도의 중심좌표
          lat: 37.56685123050336,
          lng: 126.97864093204903,
        }}
        style={{
          width: "100%",
          height: "248px",
        }}
        level={3} // 지도의 확대 레벨
      >
        <DrawingManager
          ref={managerRef}
          drawingMode={[kakao.maps.drawing.OverlayType.MARKER]}
          guideTooltip={["draw", "drag"]}
          markerOptions={{
            // 마커 옵션입니다
            draggable: true, // 마커를 그리고 나서 드래그 가능하게 합니다
            removable: true, // 마커를 삭제 할 수 있도록 x 버튼이 표시됩니다
          }}
        />
      </Map>
      <div
        className="mx-2 mt-2 pb-[20px] flex justify-start"
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        {marker && (
          <>
            <button
              className="px-2.5 py-1 text-xs font-medium rounded-sm border"
              onClick={(e) => {
                selectOverlay(kakao.maps.drawing.OverlayType.MARKER);
              }}
            >
              마커찍기
            </button>
            <button
              className="px-2.5 py-1 text-xs font-medium rounded-sm border"
              onClick={drawOverlayData}
            >
              가져오기
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default MapMark;
