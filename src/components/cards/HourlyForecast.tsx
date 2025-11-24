import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { getWeather } from "../../api";
import Card from "./Card";

type Props = {};

export default function HourlyForecast({}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 10, lon: 25 }),
  });
  return <Card childrenClassName="flex gap-6">HourlyForecast</Card>;
}
