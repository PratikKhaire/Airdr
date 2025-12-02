import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useQuery } from "@tanstack/react-query";
import { getGeocode } from "./api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import MapLegend from "./components/MapLegend";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton";
import SidePanel from "./components/SidePanel";
import Hamburger from "/src/assets/hamburger.svg?react";
import MobileHeader from "./components/MobileHeader";
import LightDarkToggle from "./components/LightDarkToggle";

function App() {
  const [coordinates, setCoords] = useState<Coords>({ lat: 50, lon: 45 });
  const [location, setLocation] = useState("Tokyo");
  const [mapType, setMapType] = useState("clouds_new");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode(location),
  });

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setLocation("custom");
  };

  const coords =
    location === "custom"
      ? coordinates
      : { lat: geocodeData?.[0].lat ?? 0, lon: geocodeData?.[0].lon ?? 0 };

  return (
    <>
      {/* Ambient glow effects for dark mode */}
      <div className="hidden dark:block fixed top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="hidden dark:block fixed bottom-0 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="hidden dark:block fixed top-1/2 right-1/4 w-48 h-48 bg-orange-600/5 rounded-full blur-[80px] pointer-events-none z-0" />

      <MobileHeader setIsSidePanelOpen={setIsSidePanelOpen} />
      <div className="flex flex-col gap-8 pt-4 p-8 xs:pt-8 lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen 2xl:min-h-[1120px] relative z-10">
        <div className="flex flex-col gap-4 xs:flex-row xs:gap-8 px-4 py-4 rounded-2xl dark:bg-linear-to-r dark:from-white/5 dark:to-white/[0.02] dark:backdrop-blur-sm dark:border dark:border-white/10">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
            <h1 className="text-2xl font-semibold bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
              Location:
            </h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
            <h1 className="text-2xl font-semibold whitespace-nowrap bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
              Map Type:
            </h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <div className="ml-auto flex gap-4 items-center">
            <div className="hidden xs:block hover:scale-110 transition-transform">
              <LightDarkToggle />
            </div>
            <button
              onClick={() => setIsSidePanelOpen(true)}
              className="hidden xs:block hover:scale-110 transition-transform dark:text-orange-400"
            >
              <Hamburger className="size-6 lg:hidden" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">
          <div className="relative h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1 rounded-3xl overflow-hidden dark:ring-2 dark:ring-white/10 dark:shadow-2xl dark:shadow-orange-500/10 group">
            {/* Map glow overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
            <MapLegend mapType={mapType} />
          </div>
          <div className="col-span-1 2xl:row-span-2 order-2">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeather coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2">
            <Suspense fallback={<DailySkeleton />}>
              <DailyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-5">
            <Suspense fallback={<AdditionalInfoSkeleton />}>
              <AdditionalInfo coords={coords} />
            </Suspense>
          </div>
        </div>
      </div>
      <SidePanel
        coords={coords}
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />
    </>
  );
}

export default App;

// styling - Tailwind
// data fetching - TanStack Query (React Query)
