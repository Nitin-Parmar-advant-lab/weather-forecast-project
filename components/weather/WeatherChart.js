"use client";

import HourlyForecast from "../weather/HourlyForecast";

export default function WeatherChart() {
    return (
        <>
            <div className="h-full p-4 flex flex-col bg-white rounded-t-3xl border border-zinc-100 shadow-sm overflow-hidden">
                <h3 className="text-sm font-bold text-zinc-800 mb-6 uppercase tracking-widest">
                    Temperature Analysis
                </h3>
                <div className="flex-1 flex flex-col items-center justify-center bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                    <div className="text-center">
                        <div className="text-5xl mb-4">📈</div>
                        <p className="text-sm text-zinc-400 font-medium tracking-tight">
                            Weather data visualization
                        </p>
                        <p className="text-[10px] text-zinc-300 mt-1 uppercase tracking-widest">
                            Chart will appear here
                        </p>
                    </div>
                </div>
                <div className="flex-2 min-h-0">
                    <HourlyForecast />
                </div>
            </div>
        </>
    );
}
