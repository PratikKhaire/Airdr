import { useQuery } from "@tanstack/react-query";
import { getWeather } from "./api";
import Card from "./components/cards/Card";
import DailyForecast from "./components/cards/DailyForecast";

const App = () => {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  return (
    <>
      <div className=" flex flex-col gap-8 overflow-hidden w-auto">
        <Card title={"Current Weather"}>{JSON.stringify(data?.current)}</Card>

        <DailyForecast />
      </div>
    </>
  );
};

export default App;
