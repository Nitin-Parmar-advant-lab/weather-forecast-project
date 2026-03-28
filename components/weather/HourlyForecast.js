"use client";

import useData from "@/hooks/useData";

export default function HourlyForecast() {
    const { weatherData } = useData();
    const hourly = weatherData?.hourly || [];

    return (
        <div className="bg-white p-4 rounded-b-3xl border border-zinc-100 shadow-sm flex flex-col no-scrollbar">
            <h3 className="text-sm font-bold text-zinc-800 mb-4 uppercase tracking-widest">Next 24 Hours</h3>
            <div className="flex-1 flex gap-3 overflow-x-auto min-h-0 pb-2 custom-scrollbar no-scrollbar">
                {hourly.slice(0, 24).map((h) => {
                    const time = new Date(h.time).getHours();
                    return (
                        <div key={h.time} className="flex flex-col items-center justify-center min-w-[70px] bg-zinc-50 rounded-2xl border border-zinc-100/50 hover:bg-zinc-100/50 transition-colors py-2">
                            <span className="text-[10px] text-zinc-400 font-bold mb-2">
                                {time}:00
                            </span>
                            <span className="text-xl mb-1">🌤️</span>
                            <span className="text-sm font-bold text-zinc-800">{Math.round(h.temperature)}°</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
