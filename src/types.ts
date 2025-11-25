export type Coords = {
  lat: number;
  lon: number;
};

export type MapClickTypes = {
  onMapClick: (lat: number, lon: number) => void;
  coords: Coords;
} 