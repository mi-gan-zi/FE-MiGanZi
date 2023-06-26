import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type MapProps = {
  lat: number;
  lng: number;
};

const MapComponent = ({ lat, lng }: MapProps) => {
  return (
    <Map
      center={{ lat: lat, lng: lng }}
      style={{ width: "100%", height: "360px" }}
    >
      <MapMarker position={{ lat: lat, lng: lng }}></MapMarker>
    </Map>
  );
};

export default MapComponent;
