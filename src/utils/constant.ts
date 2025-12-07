import Sunrise from "/src/assets/sunrise.svg?react";
import Sunset from "/src/assets/sunset.svg?react";
import Cloud from "/src/assets/cloud.svg?react";
import Uv from "/src/assets/uv.svg?react";
import Wind from "/src/assets/wind.svg?react";
import Pressure from "/src/assets/pressure.svg?react";
export const rows = [
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
