import { useRef, useState, useEffect } from "react";
import { DrawingManager, Map } from "react-kakao-maps-sdk";
import { ReactComponent as BluePin } from "assets/blue_pin.svg";

const MapMark = ({
  keyword,
  setCoordinate,
}: {
  keyword: string;
  setCoordinate: (y: string, x: string) => void;
}) => {
  type DrawingManagerType =
    /*global kakao*/
    kakao.maps.drawing.DrawingManager<kakao.maps.drawing.OverlayType.MARKER>;

  let managerRef = useRef<DrawingManagerType>(null);
  const [map, setMap] = useState<kakao.maps.Map>();
  const [address, setAddress] = useState(null);
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

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    keyword &&
      ps.keywordSearch(`${keyword}`, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            });
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          // @ts-ignore
          map.setBounds(bounds);
        }
      });
    setAddress(null);
    // TODO: 남아있는 이전 마커 이벤트 초기화
    // return () => managerRef.current?.remove(overlayData);
  }, [map, keyword]);

  function selectOverlay(type: kakao.maps.drawing.OverlayType.MARKER) {
    const manager = managerRef.current;
    // manager?.cancel();
    manager?.select(type);
  }

  function drawOverlayData() {
    const manager = managerRef.current;
    if (manager !== null && manager.getData().marker.length !== 0) {
      let lng = manager.getData().marker[0].x.toString(); // marker[marker.length-1]
      let lat = manager.getData().marker[0].y.toString();
      setCoordinate(lat, lng);
      setOverlayData(manager.getData());
      searchAddrFromCoords(manager);
    }
  }

  function searchAddrFromCoords(manager: any) {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(
      manager?.getData().marker[0].x,
      manager?.getData().marker[0].y,
      (result: any) => setAddress(result[0].address.address_name)
    );
  }

  return (
    <>
      <Map
        center={{
          lat: 37.56685123050336,
          lng: 126.97864093204903,
        }}
        style={{
          width: "100%",
          height: "390px",
        }}
        level={3}
        onCreate={setMap}
      >
        <DrawingManager
          ref={managerRef}
          drawingMode={[kakao.maps.drawing.OverlayType.MARKER]}
          guideTooltip={["draw", "drag"]}
          markerOptions={{
            draggable: true,
            removable: true,
          }}
          onStateChanged={() => drawOverlayData()}
        />
      </Map>

      <div className="px-3 py-5 flex justify-between items-center">
        <div className="gap-2 flex flex-row items-center">
          {address ? <BluePin /> : ""}
          <div className="font-medium text-st-gray-07 ">{address}</div>
        </div>
        <button
          className="px-3 py-1.5 text-[14px] text-[#fff] rounded bg-active-blue"
          onClick={(e) => {
            selectOverlay(kakao.maps.drawing.OverlayType.MARKER);
          }}
          // disabled={address ? true : false}
        >
          마커 찍기
        </button>
      </div>
    </>
  );
};

export default MapMark;
