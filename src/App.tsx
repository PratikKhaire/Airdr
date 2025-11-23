import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getWeather } from "./api";
import Card from "./components/Card";

const App = () => {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  return (
    <>
      <Card>{JSON.stringify(data?.current)}</Card>
      <Card>{JSON.stringify(data)}</Card>
      {/* <Card>{JSON.stringify(data)?.daily}</Card> */}
      {JSON.stringify(data)}
    </>
  );
};

export default App;
