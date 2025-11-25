import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import { number } from "zod";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};


const rows = [
    {
        label:"Cloudiness (%)",
        value:"clouds",
    },
    {
        label:'UV Index',
        value:'uvi',
    },
    {
        label:'Wind Direction',
        value:'wind_deg',
    },
    {
        label:"Pressure (hPa)",
        value:'pressure',
    },
    {
        label:'Sunrise',
        value:'sunrise',
    },
    {
        label:'Sunset',
        value:'sunset',
    }

] as const

export default function AdditionalInfo({coords}: Props) {
 const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  return (
    <Card title="Additional Weather Info" 
    childrenClassName=" flex flex-col gap-8">
  {rows.map(({label,value}) =>(
    <div className=" flex justify-between" key={value}>
     <span className=" text-gray-500">{label}</span>
     <span><FormateComponent value={value} number={data.current[value]}/></span>
    </div>
  ))}
    </Card>
  )
}
       


function FormateComponent(
  { value, number }: { value: string; number: number }
): string | number {

  if (value === "sunrise" || value === "sunset") {
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return number;
}
