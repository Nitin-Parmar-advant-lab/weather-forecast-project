"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import searchSvg from "@/public/svgs/search.svg";
import useData from "@/hooks/useData";
import { getLocationSuggestions } from "@/lib/locationService";

export default function Search() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const { updateCity } = useData();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim().length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const results = await getLocationSuggestions(query);
                setSuggestions(results);
            } catch (err) {
                setSuggestions([]);
            }
        };

        const timer = setTimeout(fetchSuggestions, 500);
        return () => clearTimeout(timer);
    }, [query]);

    const handleSelectCity = (city) => {
        updateCity({
            name: city.name,
            lat: city.latitude,
            lon: city.longitude,
            admin1: city.admin1,
            country: city.country,
        });
        setQuery("");
        setSuggestions([]);
    };

    return (
        <div className="relative group flex flex-col items-center w-full max-w-sm mx-auto sm:max-w-none">
            <div className="flex justify-between items-center border border-white/10 gap-2 rounded-full px-5 py-2.5 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 bg-black/20 focus-within:bg-black/40 backdrop-blur-3xl shadow-inner transition-all duration-500 w-full sm:w-64 relative z-50">
                <Image
                    src={searchSvg}
                    alt="search"
                    className="w-4 opacity-40 shrink-0 invert"
                />
                <input
                    type="text"
                    placeholder="Search city e.g. London"
                    className="outline-none text-sm bg-transparent w-full text-white placeholder:text-white/30 font-medium"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    suppressHydrationWarning
                />
            </div>

            {suggestions.length > 0 && (
                <div className="absolute top-14 left-0 right-0 z-[100] bg-black/40 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden w-full sm:w-64 mx-auto">
                    <ul className="flex flex-col gap-1 max-h-60 overflow-y-auto no-scrollbar">
                        {suggestions.map((city) => (
                            <li
                                key={city.id}
                                className="px-4 py-3 sm:py-2.5 hover:bg-white/10 rounded-xl cursor-pointer text-xs sm:text-sm flex justify-between items-center gap-3 transition-colors duration-300 group"
                                onClick={() => handleSelectCity(city)}
                            >
                                <span className="font-bold text-indigo-400 truncate flex-1">{city.name}</span>
                                <span className="text-[9px] sm:text-[10px] text-white/40 font-black uppercase tracking-wider whitespace-nowrap shrink-0">
                                    {city.admin1 ? `${city.admin1}, ` : ""}{city.country}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
