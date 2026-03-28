"use client";

import useData from "@/hooks/useData";

export default function CFToggle() {
    const { unit, toggleTemperatureUnit } = useData();

    return (
        <div className="flex bg-zinc-100 rounded-full p-1.5 inset-shadow-md border border-zinc-200 w-20">
            <button
                onClick={() => unit !== "c" && toggleTemperatureUnit()}
                className={`flex-1 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                    unit === "c"
                        ? "bg-white text-zinc-900 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700"
                }`}
            >
                °C
            </button>
            <button
                onClick={() => unit !== "f" && toggleTemperatureUnit()}
                className={`flex-1 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                    unit === "f"
                        ? "bg-white text-zinc-900 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700"
                }`}
            >
                °F
            </button>
        </div>
    );
}
