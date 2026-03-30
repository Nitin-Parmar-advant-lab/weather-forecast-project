"use client";

import useData from "@/hooks/useData";
import { getWeatherDescription } from "@/lib/weatherUtils";
import Image from "next/image";

export default function CurrentWeather() {
    const { weatherData, selectedCity } = useData();
    const current = weatherData?.current;

    if (!current)
        return <div className="animate-pulse bg-white/20 h-full rounded-3xl" />;

    const weatherInfo = getWeatherDescription(current.weather_code);

    const metrics = [
        {
            label: "Humidity",
            value: `${current.relative_humidity_2m}%`,
            icon: "💧",
        },
        {
            label: "Wind Speed",
            value: `${current.wind_speed_10m} km/h`,
            icon: "💨",
        },
        {
            label: "Pressure",
            value: `${current.surface_pressure} hPa`,
            icon: "⏲️",
        },
        {
            label: "Apparent",
            value: `${current.apparent_temperature}°`,
            icon: "🌡️",
        },
    ];

    return (
        <div className="relative group overflow-hidden rounded-3xl border border-white/10 shadow-2xl min-h-[320px] sm:min-h-[400px] flex flex-col justify-between transition-all duration-500 hover:shadow-indigo-500/10">
            <div className="absolute inset-0 z-0">
                <Image
                    src={`/images/weather/${current.weather_code}.jpeg`}
                    alt="Weather Background"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/30 to-slate-950/90" />
            </div>

            <div className="relative z-10 p-4 sm:p-6 pt-6 sm:pt-8 flex flex-col items-center text-center">
                <div className="mb-3 sm:mb-4">
                    <h1 className="text-lg sm:text-xl font-black text-white leading-none tracking-tight drop-shadow-md">
                        {selectedCity?.name}
                    </h1>
                    <p className="text-[9px] sm:text-[10px] text-white/70 font-bold uppercase tracking-[0.2em] mt-1">
                        {selectedCity?.country}
                    </p>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <span className="text-5xl sm:text-6xl font-light text-white tracking-tighter drop-shadow-lg">
                        {current.temperature_2m}
                        <span className="text-2xl sm:text-3xl font-normal opacity-80">
                            °
                        </span>
                    </span>
                    <p className="text-[9px] sm:text-[10px] text-white font-bold uppercase tracking-[.2em] bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        {weatherInfo.description}
                    </p>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-2 p-6 mt-auto">
                {metrics.map((m) => (
                    <div
                        key={m.label}
                        className="group/item flex items-center justify-between gap-2 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 transition-all hover:bg-white/15"
                    >
                        <div className="flex flex-col">
                            <span className="text-[8px] text-white/50 font-bold uppercase tracking-wider leading-none mb-1">
                                {m.label}
                            </span>
                            <span className="text-[11px] font-bold text-white tracking-tight leading-none">
                                {m.value}
                            </span>
                        </div>
                        <span className="text-lg filter drop-shadow-sm group-hover/item:scale-110 transition-transform">
                            {m.icon}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
