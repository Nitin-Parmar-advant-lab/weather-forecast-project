"use client";

import { useState } from "react";
import Image from "next/image";
import searchSvg from "@/public/svgs/search.svg";
import useData from "@/hooks/useData";
import { searchLocation } from "@/lib/actions";

export default function Search() {
    const [query, setQuery] = useState("");
    const { updateCity } = useData();

    async function handleSearch(e) {
        if (e.key === "Enter") {
            const city = await searchLocation(query);

            if (city) {
                updateCity({
                    name: city.name,
                    lat: city.latitude,
                    lon: city.longitude,
                    admin1: city.admin1,
                    country: city.country,
                });
                setQuery("");
            }
        }
    }

    return (
        <div className="relative group flex flex-col items-center w-full max-w-sm mx-auto sm:max-w-none">
            <div className="flex justify-between items-center border border-white/10 gap-2 rounded-full px-5 py-2.5 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 bg-black/20 focus-within:bg-black/40 backdrop-blur-3xl shadow-inner transition-all duration-500 w-full sm:w-64">
                <Image
                    src={searchSvg}
                    alt="search"
                    className="w-4 opacity-40 shrink-0 invert"
                />
                <input
                    type="text"
                    placeholder="Search city"
                    className="outline-none text-sm bg-transparent w-full text-white placeholder:text-white/30 font-medium"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    suppressHydrationWarning
                />
            </div>
        </div>
    );
}
