import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type MarkersType = {
  position: { lat: string; lng: string };
  content?: string;
};
type KeywordType = {
  keyWord?: string;
  //TODO: type 정의
  setMarkes: Dispatch<SetStateAction<any>>;
};
export default function KeywordMap(props: KeywordType) {
  const { keyWord, setMarkes } = props;
  const [info, setInfo] = useState();
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState<MarkersType[]>([]);

  useEffect(() => {
    if (keyWord) {
      if (!map) return;
      /*global kakao*/
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(`${keyWord}`, (data, status, _pagination) => {
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
          setMarkes(markers[0].position);
          setMarkers(markers);
          // @ts-ignore
          map.setBounds(bounds);
        }
      });
    }
  }, [map, keyWord]);

  return (
    <div className="flex rounded-lx mx-auto">
      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "350px",
          height: "213px",
        }}
        level={3}
        // @ts-ignore
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            // @ts-ignore
            position={marker.position}
            // @ts-ignore
            onClick={() => setInfo(marker)}
          >
            {
              // @ts-ignore
              info && info.content === marker.content && (
                <div style={{ color: "#000" }}>{marker.content}</div>
              )
            }
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
