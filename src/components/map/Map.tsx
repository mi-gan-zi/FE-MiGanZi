import React, { useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type MapProps = {
  lat: number;
  lng: number;
};

const MapComponent = ({ lat, lng }: MapProps) => {
  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: "100%", height: "360px" }}
    >
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}></MapMarker>
    </Map>
  );
};

export default MapComponent;
