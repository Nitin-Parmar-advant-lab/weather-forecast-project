"use client";

import useData from "@/hooks/useData";
import { getWeatherDescription } from "@/lib/weatherUtils";
import Image from "next/image";
import test from "@/public/images/weather/1.jpeg"

export default function CurrentWeather() {
    const { weatherData, selectedCity, favorites, toggleFavorite } = useData();
    const current = weatherData?.current;
    
    const isFavorite = favorites.some((f) => f.name === selectedCity?.name);

    if (!current) return <div className="animate-pulse bg-white/20 h-full rounded-3xl" />;

    const weatherInfo = getWeatherDescription(current.weather_code);

    const metrics = [
        { label: "Humidity", value: `${current.relative_humidity_2m}%`, icon: "💧" },
        { label: "Wind Speed", value: `${current.wind_speed_10m} km/h`, icon: "💨" },
        { label: "Pressure", value: `${current.surface_pressure} hPa`, icon: "⏲️" },
        { label: "Apparent", value: `${current.apparent_temperature}°`, icon: "🌡️" },
    ];

    return (
        <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm h-full flex flex-col justify-between overflow-hidden relative group">
            <div className="flex flex-col items-center">
                <div className="text-center mb-2">
                    <h1 className="text-xl font-bold text-zinc-900 leading-tight">{selectedCity?.name}</h1>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{selectedCity?.country}</p>
                </div>
                <Image
                    src={test}
                    alt="Weather Icon"
                    className="object-cover"
                    sizes="100%"
                />
                <h2 className="text-5xl font-bold text-zinc-800">{current.temperature_2m}°</h2>
                <p className="text-lg text-zinc-400 font-medium uppercase tracking-widest">
                    {weatherInfo.description}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 absolute bg-transparent">
                {metrics.map((m) => (
                    <div key={m.label} className="bg-zinc-50 p-3 rounded-2xl flex flex-col gap-1 border border-zinc-100/50">
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">{m.label}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm">{m.icon}</span>
                            <span className="text-sm font-bold text-zinc-700">{m.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
