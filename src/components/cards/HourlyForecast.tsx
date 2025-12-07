import Card from "./Card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function HourlyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      childrenClassName="flex gap-4 overflow-x-scroll pb-2"
      className="relative overflow-hidden"
    >
      {/* Gradient fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-6
  bg-linear-to-r from-[rgba(255,255,255,0.15)] to-transparent
  rounded-l-[inherit] pointer-events-none z-10"
      />

      <div
        className="absolute right-0 top-0 bottom-0 w-6
  bg-linear-to-l from-[rgba(255,254,254,0.15)] to-transparent
  rounded-r-[inherit] pointer-events-none z-10"
      />

      {data.hourly.map((hour, index) => (
        <div
          key={hour.dt}
          className="flex flex-col 2xl:justify-between gap-3 items-center p-4 min-w-24 rounded-2xl bg-linear-to-br from-white/40 to-white/20 dark:from-white/10 dark:to-white/5 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 dark:hover:shadow-orange-500/30 transition-all duration-300 group"
          style={{ animationDelay: `${index * 30}ms` }}
        >
          <p className="whitespace-nowrap text-xs font-semibold dark:text-white/70 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <div className="relative">
            <div className="absolute inset-0 bg-orange-400/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <WeatherIcon
              className="2xl:size-10 size-8 relative z-10 group-hover:scale-110 transition-transform duration-300"
              src={hour.weather[0].icon}
            />
          </div>
          <p className="text-lg font-bold dark:text-orange-400 group-hover:scale-110 transition-transform">
            {Math.round(hour.temp)}°F
          </p>
        </div>
      ))}
    </Card>
  );
}
