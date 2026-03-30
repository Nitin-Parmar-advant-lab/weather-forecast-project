"use client";

import useData from "@/hooks/useData";
import { Clock } from "lucide-react";
import { getWeatherDescription } from "@/lib/weatherUtils";

export default function HourlyForecast() {
    const { weatherData } = useData();
    const hourly = weatherData?.hourly || [];

    if (!hourly.length) return null;

    return (
        <div className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:border-indigo-500/30 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    24h Forecast
                </h3>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth px-1">
                {hourly.slice(0, 24).map((h) => {
                    const date = new Date(h.time);
                    const hour = date.getHours();
                    const ampm = hour >= 12 ? 'PM' : 'AM';
                    const displayHour = hour % 12 || 12;
                    const weather = getWeatherDescription(h.weatherCode);
                    
                    return (
                        <div 
                            key={h.time} 
                            className="flex flex-col items-center justify-center min-w-17.5 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/item"
                        >
                            <span className="text-[9px] text-white/30 font-black mb-3 uppercase tracking-widest group-hover/item:text-indigo-400 transition-colors">
                                {displayHour} {ampm}
                            </span>
                            
                            <div className="text-xl mb-2 drop-shadow-lg filter group-hover/item:scale-110 transition-transform duration-500">
                                {weather.icon === 'sun' && '☀️'}
                                {weather.icon === 'sun-cloud' && '⛅'}
                                {weather.icon === 'cloud-sun' && '🌤️'}
                                {weather.icon === 'cloud' && '☁️'}
                                {weather.icon === 'cloud-rain' && '🌧️'}
                                {weather.icon === 'cloud-showers-heavy' && '⛈️'}
                                {weather.icon === 'cloud-lightning' && '🌩️'}
                                {weather.icon === 'snowflake' && '❄️'}
                                {(!weather.icon || !['sun', 'sun-cloud', 'cloud-sun', 'cloud', 'cloud-rain', 'cloud-showers-heavy', 'cloud-lightning', 'snowflake'].includes(weather.icon)) && '☁️'}
                            </div>

                            <div className="flex items-center gap-0.5">
                                <span className="text-base sm:text-lg font-black text-white tracking-tighter">
                                    {Math.round(h.temperature)}
                                </span>
                                <span className="text-[10px] font-black text-indigo-400">°</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
