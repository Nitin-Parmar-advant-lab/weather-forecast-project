"use client";

import useData from "@/hooks/useData";

export default function CFToggle() {
    const { unit, toggleTemperatureUnit } = useData();

    return (
        <div className="flex bg-black/20 rounded-full p-1.5 border border-white/5 w-24 shadow-inner backdrop-blur-xl">
            <button
                onClick={() => unit !== "c" && toggleTemperatureUnit()}
                className={`flex-1 flex items-center justify-center rounded-full text-xs font-black transition-all duration-300 py-1.5 ${
                    unit === "c"
                        ? "bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        : "text-white/40 hover:text-white/80 hover:bg-white/5"
                }`}
            >
                °C
            </button>
            <button
                onClick={() => unit !== "f" && toggleTemperatureUnit()}
                className={`flex-1 flex items-center justify-center rounded-full text-xs font-black transition-all duration-300 py-1.5 ${
                    unit === "f"
                        ? "bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        : "text-white/40 hover:text-white/80 hover:bg-white/5"
                }`}
            >
                °F
            </button>
        </div>
    );
}
