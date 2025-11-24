/* eslint-disable no-empty-pattern */
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";

type Props = {};

export default function DailyForecast({}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 10, lon: 25 }),
  });
  return (
    <Card title="Daily Forecast " childrenClassName="flex flex-col gap-4 ">
      {data.daily.map((day) => (
        <div key={day.dt} className=" flex justify-between  ">
          <p className=" w-9">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
            })}{" "}
          </p>
          <WeatherIcon src={day.weather[0].icon} />
          <p className=" ">{Math.round(day.temp.day)}°F</p>
          <p className=" text-gray-500/75 ">{Math.round(day.temp.min)}°F</p>
          <p className=" text-gray-500/75 ">{Math.round(day.temp.max)}°F</p>
        </div>
      ))}
    </Card>
  );
}
