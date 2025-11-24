import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";

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
          <img
            src={` https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
            alt="weather icon"
          />
          <p className=" ">{Math.round(day.temp.day)}°F</p>
          <p className=" text-gray-500/75 ">{Math.round(day.temp.min)}°F</p>
          <p className=" text-gray-500/75 ">{Math.round(day.temp.max)}°F</p>
        </div>
      ))}
    </Card>
  );
}
