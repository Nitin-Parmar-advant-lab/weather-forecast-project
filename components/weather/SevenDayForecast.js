"use client";

import useData from "@/hooks/useData";
import { 
    Calendar, Sun, Cloud, CloudSun, CloudRain, 
    CloudLightning, CloudSnow, Snowflake, CloudFog 
} from "lucide-react";
import { getWeatherDescription } from "@/lib/weatherUtils";

const weatherIconMap = {
    "sun": Sun,
    "sun-cloud": CloudSun,
    "cloud-sun": CloudSun,
    "cloud": Cloud,
    "fog": CloudFog,
    "cloud-rain": CloudRain,
    "cloud-snow": CloudSnow,
    "snowflake": Snowflake,
    "cloud-lightning": CloudLightning,
    "cloud-showers-heavy": CloudRain,
};

const WeatherIcon = ({ code }) => {
    const { icon } = getWeatherDescription(code);
    const IconComponent = weatherIconMap[icon] || Cloud;
    return <IconComponent className="w-5 h-5 text-blue-300" />;
};

export default function SevenDayForecast() {
    const { weatherData } = useData();

    if (!weatherData?.daily) {
        return null;
    }

    const formatDate = (dateString, index) => {
        if (index === 0) return "Today";
        return new Date(dateString).toLocaleDateString("en-US", { weekday: "short" });
    };

    return (
        <div className="p-6 sm:p-8 rounded-4xl border border-white/5 bg-black/20 backdrop-blur-3xl shadow-2xl transition-all duration-500 mb-4 hover:border-white/10">
            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <h3 className="font-black text-white tracking-[0.2em] uppercase text-[10px] opacity-60">
                    7-Days Forecast
                </h3>
            </div>

            <div className="flex flex-col gap-6">
                {weatherData.daily.map((day, index) => (
                    <div key={day.time} className="flex items-center justify-between group cursor-default">
                        <span className="w-14 text-xs sm:text-sm font-black text-white/90 group-hover:text-indigo-400 transition-colors">
                            {formatDate(day.time, index)}
                        </span>

                        <div className="flex justify-center flex-1">
                            <div className="p-2 rounded-xl bg-white/5 border border-white/5 group-hover:scale-125 transition-transform duration-500">
                                <WeatherIcon code={day.weatherCode} />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4 min-w-[110px] sm:min-w-[140px] justify-end">
                            <span className="text-[11px] sm:text-xs font-black text-white/30 w-7 sm:w-8 text-right">
                                {Math.round(day.minTemp)}°
                            </span>
                            
                            <div className="h-1.5 w-12 sm:w-20 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                                <div 
                                    className="absolute inset-y-0 rounded-full bg-linear-to-r from-blue-500 via-indigo-500 to-rose-500 opacity-90 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                                    style={{ 
                                        left: "15%", 
                                        right: "15%" 
                                    }}
                                />
                            </div>

                            <span className="text-[11px] sm:text-xs font-black text-white w-7 sm:w-8 text-right group-hover:text-rose-400 transition-colors">
                                {Math.round(day.maxTemp)}°
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
