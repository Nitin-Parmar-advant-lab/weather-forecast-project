"use client";

import useData from "@/hooks/useData";
import CurrentWeather from "../weather/CurrentWeather";
import FavoriteCities from "../weather/FavoriteCities";
import HourlyForecast from "../weather/HourlyForecast";
import WeatherChart from "../weather/WeatherChart";
import SevenDayForecast from "../weather/SevenDayForecast";

export default function MainSection() {
    const { weatherData, isLoading, error, selectedCity } = useData();
    return (
        <main className="p-4 overflow-auto border m-2">
            {/* <SevenDayForecast />
            <CurrentWeather />
            <FavoriteCities />
            <HourlyForecast />
            <WeatherChart /> */}

            {isLoading && <p>Loading forecast for {selectedCity.name}...</p>}
            {error && <p>Error: {error}</p>}

            {!isLoading && !error && (
                <pre className="text-xs bg-white rounded h-[500px]">
                    {JSON.stringify({ selectedCity, weatherData }, null, 2)}
                </pre>
            )}
        </main>
    );
}
