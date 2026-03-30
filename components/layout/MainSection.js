"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useData from "@/hooks/useData";
import { weatherAction } from "@/store/weatherSlice";
import dynamic from "next/dynamic";
import CurrentWeather from "../weather/CurrentWeather";
import FavoriteCities from "../weather/FavoriteCities";
import SevenDayForecast from "../weather/SevenDayForecast";

const WeatherChart = dynamic(() => import("../weather/WeatherChart"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-3xl animate-pulse backdrop-blur-3xl border border-white/10" />
});

const HourlyForecast = dynamic(() => import("../weather/HourlyForecast"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex mt-4 items-center justify-center bg-white/5 rounded-3xl animate-pulse backdrop-blur-3xl border border-white/10" />
});

export default function MainSection() {
    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.weather);
    const { isLoading, selectedCity, refreshWeather } = useData();

    useEffect(() => {
        refreshWeather();
    }, [refreshWeather]);

    useEffect(() => {
        const savedFavorites = localStorage.getItem("weather_favorites");
        if (savedFavorites) {
            try {
                dispatch(weatherAction.setFavorites(JSON.parse(savedFavorites)));
            } catch (error) {
                console.error("Failed to parse favorites from local storage", error);
            }
        }
    }, [dispatch]);

    useEffect(() => {
        if (favorites.length > 0 || localStorage.getItem("weather_favorites")) {
            localStorage.setItem("weather_favorites", JSON.stringify(favorites));
        }
    }, [favorites]);

    return (
        <main className="flex-1 min-h-0 py-4 sm:py-6 px-4 sm:px-6 lg:overflow-hidden grid grid-rows-1 gap-4">
            <div className="grid grid-cols-12 gap-4 sm:gap-6 min-h-0 py-2">
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 sm:gap-6 min-h-0 lg:overflow-y-auto pr-0 sm:pr-1.5 no-scrollbar pb-2 sm:pb-6">
                    <CurrentWeather />
                    <SevenDayForecast />
                    <FavoriteCities />
                </div>

                <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 sm:gap-6 min-h-0">
                    <div className="flex-none lg:flex-3 h-[300px] lg:h-auto min-h-0">
                        <WeatherChart />
                    </div>
                    <div className="flex-none sm:flex-1.5 min-h-0">
                        <HourlyForecast />
                    </div>
                </div>
            </div>

            {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <p className="animate-pulse text-white font-medium tracking-wide">
                            Updating forecast for {selectedCity.name}...
                        </p>
                    </div>
                </div>
            )}
        </main>
    );
}
