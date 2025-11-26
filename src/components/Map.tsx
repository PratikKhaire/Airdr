import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import type { Coords, MapClickTypes } from "../types";

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
};

export default function Map({ coords, onMapClick }: Props) {
  const { lat, lon } = coords;
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      style={{ width: "800px", height: "500px" }}
      scrollWheelZoom={false}
    >
      {" "}
      <MapClick onMapClick={onMapClick} coords={coords} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[19.88, 75.35]} />
    </MapContainer>
  );
}

function MapClick({ onMapClick, coords }: MapClickTypes) {
  const map = useMap();

  useEffect(() => {
    map.panTo([coords.lat, coords.lon]);
  }, [coords, map]);

  useEffect(() => {
    const handleClick = (e: any) => {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    };
    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [map, onMapClick]);

  return null;
}
