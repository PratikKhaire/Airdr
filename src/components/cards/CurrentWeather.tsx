import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function CurrentWeather({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  return (
    <Card
      title="Current Weather"
      className="md:pb-11 relative overflow-hidden group"
      childrenClassName="flex flex-col items-center gap-6 2xl:justify-between"
    >
      {/* Animated gradient background orb */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-amber-500/20 dark:from-orange-500/10 dark:to-amber-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex flex-col gap-2 items-center relative z-10">
        <h2 className="text-7xl font-bold text-center bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-400 dark:from-orange-500 dark:via-amber-400 dark:to-yellow-300 bg-clip-text text-transparent animate-pulse">
          {Math.round(data.current.temp)}°F
        </h2>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-xl opacity-50 animate-pulse" />
          <WeatherIcon
            src={data.current.weather[0].icon}
            className="size-16 relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3 className="capitalize text-xl font-medium dark:text-white/90">
          {data.current.weather[0].description}
        </h3>
      </div>
      <div className="flex flex-col gap-2 relative z-10">
        <p className="text-sm text-center dark:text-white/60 uppercase tracking-wider font-medium">
          Local Time
        </p>
        <h3 className="text-5xl font-bold dark:text-white bg-gradient-to-r from-orange-400 to-amber-400 dark:from-orange-500 dark:to-amber-400 bg-clip-text text-transparent">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: data.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
      </div>
      <div className="flex justify-between w-full gap-2 relative z-10">
        <div className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-white/50 to-white/30 dark:from-white/5 dark:to-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:scale-105 transition-transform duration-300">
          <p className="text-xs text-gray-600 dark:text-white/50 uppercase tracking-wide font-semibold">
            Feels Like
          </p>
          <p className="text-lg font-bold dark:text-orange-400">
            {Math.round(data.current.feels_like)}°F
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-white/50 to-white/30 dark:from-white/5 dark:to-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:scale-105 transition-transform duration-300">
          <p className="text-xs text-gray-600 dark:text-white/50 uppercase tracking-wide font-semibold">
            Humidity
          </p>
          <p className="text-lg font-bold dark:text-amber-400">
            {data.current.humidity}%
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-white/50 to-white/30 dark:from-white/5 dark:to-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:scale-105 transition-transform duration-300">
          <p className="text-xs text-gray-600 dark:text-white/50 uppercase tracking-wide font-semibold">
            Wind
          </p>
          <p className="text-lg font-bold dark:text-yellow-400">
            {data.current.wind_speed} mph
          </p>
        </div>
      </div>
    </Card>
  );
}
