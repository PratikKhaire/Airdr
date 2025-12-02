import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function DailyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Daily Forecast"
      childrenClassName="flex flex-col gap-3 2xl:justify-between"
      className="relative overflow-hidden"
    >
      {/* Animated gradient accent */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-linear-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {data?.daily.map((day, index) => (
        <div
          key={day.dt}
          className="flex justify-between items-center px-4 py-3 rounded-xl bg-linear-to-r from-white/30 to-white/20 dark:from-white/5 dark:to-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:scale-[1.02] hover:shadow-md hover:shadow-orange-500/20 dark:hover:shadow-orange-500/20 transition-all duration-300 group relative z-10"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <p className="w-12 font-semibold text-sm dark:text-white/80 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>
          <div className="relative">
            <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <WeatherIcon
              src={day.weather[0].icon}
              className="relative z-10 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <p className="font-bold text-lg dark:text-orange-400">
            {Math.round(day.temp.day)}°F
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <span className="text-xs dark:text-white/50">Min</span>
              <p className="text-sm font-semibold dark:text-blue-400">
                {Math.round(day.temp.min)}°F
              </p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs dark:text-white/50">Max</span>
              <p className="text-sm font-semibold dark:text-red-400">
                {Math.round(day.temp.max)}°F
              </p>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}
