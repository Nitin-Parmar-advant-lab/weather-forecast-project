"use client";

import useData from "@/hooks/useData";
import CurrentWeather from "../weather/CurrentWeather";
import FavoriteCities from "../weather/FavoriteCities";
import WeatherChart from "../weather/WeatherChart";
import SevenDayForecast from "../weather/SevenDayForecast";

export default function MainSection() {
    const { isLoading, selectedCity } = useData();

    return (
        <main className="flex-1 min-h-0 pb-4 px-6 overflow-hidden grid grid-rows-[auto_1fr]">
            <section className="w-full flex justify-center py-2 shrink-0">
                <SevenDayForecast />
            </section>

            <div className="grid grid-cols-12 gap-4 min-h-0">
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 min-h-0">
                    <div className="flex-3 min-h-0">
                        <CurrentWeather />
                    </div>
                    <div className="flex-2 min-h-0">
                        <FavoriteCities />
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-8 flex flex-col min-h-0">
                    <div className="flex-3 min-h-0">
                        <WeatherChart />
                    </div>
                </div>
            </div>

            {/* {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                    <div className="animate-pulse text-xl font-medium text-zinc-600">
                        Updating forecast for {selectedCity.name}...
                    </div>
                </div>
            )} */}
        </main>
    );
}
