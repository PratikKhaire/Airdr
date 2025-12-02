import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import Sunrise from "/src/assets/sunrise.svg?react";
import Sunset from "/src/assets/sunset.svg?react";
import Cloud from "/src/assets/cloud.svg?react";
import Uv from "/src/assets/uv.svg?react";
import Wind from "/src/assets/wind.svg?react";
import Pressure from "/src/assets/pressure.svg?react";
import UpArrow from "/src/assets/uparrow.svg?react";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function AdditionalInfo({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
      className="relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-orange-500/10 to-amber-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {rows.map(({ label, value, Icon }, index) => (
        <div
          className="flex justify-between items-center px-4 py-4 rounded-xl bg-linear-to-br from-white/30 to-white/20 dark:from-white/5 dark:to-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10 dark:hover:shadow-orange-500/20 transition-all duration-300 group relative z-10"
          key={value}
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <div className="flex gap-3 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Icon className="size-8 relative z-10 dark:opacity-80 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-sm font-medium dark:text-white/70 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
              {label}
            </span>
          </div>
          <span className="text-lg font-bold dark:text-orange-400">
            <FormatComponent value={value} number={data.current[value]} />
          </span>
        </div>
      ))}
    </Card>
  );
}

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset")
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  if (value === "wind_deg")
    return (
      <UpArrow
        className="size-8"
        style={{ transform: `rotate(${number}deg)` }}
      />
    );

  return number;
}

const rows = [
  {
    label: "Cloudiness (%)",
    value: "clouds",
    Icon: Cloud,
  },
  {
    label: "UV Index",
    value: "uvi",
    Icon: Uv,
  },
  {
    label: "Wind Direction",
    value: "wind_deg",
    Icon: Wind,
  },
  {
    label: "Pressure (hPa)",
    value: "pressure",
    Icon: Pressure,
  },
  {
    label: "Sunrise",
    value: "sunrise",
    Icon: Sunrise,
  },
  {
    label: "Sunset",
    value: "sunset",
    Icon: Sunset,
  },
] as const;
