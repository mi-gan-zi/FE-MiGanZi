import { useRef, useState } from "react";
import { DrawingManager, Map, MapMarker } from "react-kakao-maps-sdk";

const MapMark = () => {
  type DrawingManagerType =
    /*global kakao*/
    kakao.maps.drawing.DrawingManager<kakao.maps.drawing.OverlayType.MARKER>;

  const managerRef = useRef<DrawingManagerType>(null);

  const [overlayData, setOverlayData] = useState<ReturnType<DrawingManagerType["getData"]>>({
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
  }

  function drawOverlayData() {
    const manager = managerRef.current;
    console.log(manager?.getData().marker[0].x);
    console.log(manager?.getData().marker[0].y);
    manager && setOverlayData(manager.getData());

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    searchAddrFromCoords(manager, geocoder);
  }

  function searchAddrFromCoords(manager: any, geocoder: any) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2Address(manager?.getData().marker[0].x, manager?.getData().marker[0].y, (result: any) =>
      console.log(result[0].address)
    );
  }

  return (
    <>
      <Map
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
          guideTooltip={["draw", "drag", "edit"]}
          markerOptions={{
            // 마커 옵션입니다
            draggable: true, // 마커를 그리고 나서 드래그 가능하게 합니다
            removable: true, // 마커를 삭제 할 수 있도록 x 버튼이 표시됩니다
          }}
        />
      </Map>
      <div
        style={{
          display: "flex",
          gap: "8px",
        }}
      >
        <button
          onClick={(e) => {
            selectOverlay(kakao.maps.drawing.OverlayType.MARKER);
          }}
        >
          마커
        </button>
      </div>
      <div
        style={{
          position: "relative",
        }}
      >
        <div>
          <button onClick={drawOverlayData}>가져오기</button>
        </div>
      </div>
    </>
  );
};

export default MapMark;
