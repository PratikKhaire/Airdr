import type { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

export default function LocationDropdown({ location, setLocation }: Props) {
  return (
    <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger className="w-full xs:w-[180px] dark:bg-linear-to-br dark:from-white/10 dark:to-white/5 dark:border-white/20 dark:hover:border-orange-400/50 dark:hover:shadow-lg dark:hover:shadow-orange-500/20 transition-all duration-300">
        <SelectValue placeholder="Select Location" />
      </SelectTrigger>
      <SelectContent className="z-1001 dark:bg-zinc-900/95 dark:backdrop-blur-xl dark:border-white/20">
        {location === "custom" && (
          <SelectItem
            value="custom"
            className="dark:hover:bg-orange-500/20 dark:focus:bg-orange-500/20"
          >
            Custom
          </SelectItem>
        )}
        {locations.map((city) => (
          <SelectItem
            key={city}
            value={city}
            className="dark:hover:bg-orange-500/20 dark:focus:bg-orange-500/20"
          >
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const locations = [
  "Mumbai",
  "Pune",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Mathura",
  "Bangkok",
  "Tokyo",
  "Seoul",
  "Dubai",
  "Manila",
  "London",
  "New York",
  "Paris",
  "Berlin",
  "Madrid",
  "Rome",
  "Lisbon",
];
