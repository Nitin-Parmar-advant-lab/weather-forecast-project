"use client";

import DailyWeatherItem from "../ui/DailyWeatherItem";
import useData from "@/hooks/useData";

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
        <div className="flex justify-center items-center px-2 h-10 overflow-y-auto gap-1 rounded-lg ">
            {weatherData.daily.map((day, index) => (
                <DailyWeatherItem
                    key={day.time}
                    day={formatDate(day.time, index)}
                    temperature={Math.round(day.maxTemp)} 
                />
            ))}
        </div>
    );
}
