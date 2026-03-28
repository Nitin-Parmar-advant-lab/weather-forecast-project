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
        <div className="relative group flex flex-col items-center">
            <div className="flex justify-between items-center border border-gray-400 gap-2 rounded-full px-2 py-1.5 focus-within:ring-1 bg-white/50 backdrop-blur-sm shadow-sm transition-all duration-300">
                <Image
                    src={searchSvg}
                    alt="search"
                    className="w-5 opacity-50"
                />
                <input
                    type="text"
                    placeholder="Search city"
                    className="outline-none text-sm bg-transparent w-48 text-zinc-800"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    suppressHydrationWarning
                />
            </div>
        </div>
    );
}
