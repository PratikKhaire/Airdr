import type { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-full xs:w-[180px] dark:bg-linear-to-br dark:from-white/10 dark:to-white/5 dark:border-white/20 dark:hover:border-orange-400/50 dark:hover:shadow-lg dark:hover:shadow-orange-500/20 transition-all duration-300">
        <SelectValue placeholder="Select Map Type" />
      </SelectTrigger>
      <SelectContent className="z-1001 dark:bg-zinc-900/95 dark:backdrop-blur-xl dark:border-white/20">
        {types.map((city) => (
          <SelectItem
            key={city}
            value={city}
            className="capitalize dark:hover:bg-orange-500/20 dark:focus:bg-orange-500/20"
          >
            {city.split("_")[0]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const types = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new",
];
