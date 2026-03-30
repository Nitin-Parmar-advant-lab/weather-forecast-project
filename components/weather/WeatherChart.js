"use client";

import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Thermometer, Clock } from "lucide-react";
import useData from "@/hooks/useData";

const CustomTooltip = ({ active, payload, unit }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-xl">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">
                    Temperature
                </p>
                <p className="text-xl font-black text-white">
                    {payload[0].value}°
                    <span className="text-sm opacity-60 uppercase">{unit}</span>
                </p>
                <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    <span className="text-[10px] font-medium text-indigo-100/70">
                        {payload[0].payload.name}
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

export default function WeatherChart() {
    const { weatherData, unit } = useData();

    if (!weatherData?.hourly || weatherData.hourly.length === 0) {
        return (
            <div className="h-75 w-full bg-white/5 animate-pulse rounded-3xl" />
        );
    }

    const hourly = weatherData.hourly;

    const chartData = hourly.slice(0, 24).map((item) => {
        const date = new Date(item.time);
        return {
            name: date.toLocaleTimeString("en-US", {
                hour: "numeric",
                hour12: true,
            }),
            time: date.getTime(),
            temp: item.temperature,
        };
    });

    return (
        <div className="group relative overflow-hidden bg-black/20 backdrop-blur-3xl border border-white/5 rounded-4xl p-6 transition-all duration-500 hover:border-white/10 h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between mb-8 shrink-0">
                <div>
                    <h2 className="text-[10px] sm:text-xs font-black text-white/40 tracking-[0.2em] uppercase flex items-center gap-3">
                        <Thermometer className="w-4 h-4 text-indigo-400" />
                        Hourly Temperature
                    </h2>
                </div>
            </div>

            <div className="flex-1 min-h-[180px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%" minHeight={180}>
                    <AreaChart data={chartData} margin={{ bottom: 15 }}>
                        <defs>
                            <linearGradient
                                id="colorTemp"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#6366f1"
                                    stopOpacity={0.4}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#6366f1"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="rgba(255,255,255,0.03)"
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "rgba(255,255,255,0.3)",
                                fontSize: 9,
                                fontWeight: 700,
                            }}
                            interval={window?.innerWidth < 640 ? 6 : 3}
                            dy={10}
                        />
                        <YAxis
                            domain={["auto", "auto"]}
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "rgba(255,255,255,0.3)",
                                fontSize: 9,
                                fontWeight: 700,
                            }}
                            tickFormatter={(value) => `${value}°`}
                            width={35}
                        />
                        <Tooltip
                            content={<CustomTooltip unit={unit} />}
                            cursor={{
                                stroke: "rgba(99, 102, 241, 0.2)",
                                strokeWidth: 2,
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="temp"
                            stroke="#818cf8"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorTemp)"
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
