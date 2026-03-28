import { useState } from "react";
import useData from "@/hooks/useData";
import { searchLocation } from "@/lib/actions";

export default function FavoriteCities() {
    const { favorites, updateCity, toggleFavorite } = useData();
    const [isAdding, setIsAdding] = useState(false);
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");

    const handleAddCity = async (e) => {
        if (e.key === "Enter") {
            setError("");
            const city = await searchLocation(query);
            if (city) {
                toggleFavorite({
                    name: city.name,
                    lat: city.latitude,
                    lon: city.longitude,
                    country: city.country,
                });
                setQuery("");
                setIsAdding(false);
            } else {
                setError("City not found");
            }
        }
    };

    return (
        <div className="backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-xl h-full flex flex-col overflow-hidden transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white tracking-wide">
                        Saved Location
                    </h3>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${isAdding ? "bg-red-500/20 border-red-400 rotate-45" : "bg-white/20 border-white/40 hover:bg-white/30"}`}
                >
                    <span className="text-white text-2xl font-light">+</span>
                </button>
            </div>

            {isAdding && (
                <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <input
                        autoFocus
                        type="text"
                        placeholder="Type city name..."
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/30 transition-all text-sm"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleAddCity}
                    />
                    {error && (
                        <p className="text-red-300 text-[10px] mt-1 ml-1 font-bold italic">
                            {error}
                        </p>
                    )}
                </div>
            )}

            <div className="flex-1 flex flex-col gap-2 overflow-y-auto min-h-0 pr-1 custom-scrollbar">
                {favorites.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-white/40 text-sm italic">
                        No saved locations
                    </div>
                ) : (
                    favorites.map((city) => (
                        <div
                            key={city.name}
                            onClick={() => updateCity(city)}
                            className="flex justify-between items-center p-3.5 bg-white/5 hover:bg-white/15 rounded-2xl transition-all duration-300 cursor-pointer border border-white/5 hover:border-white/20 group relative overflow-hidden"
                        >
                            <div className="flex flex-col z-10">
                                <span className="font-bold text-sm text-white">
                                    {city.name}
                                </span>
                                <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase">
                                    {city.country}
                                </span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(city);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-xl transition-all text-white/40 hover:text-red-400 z-10"
                                title="Remove location"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
