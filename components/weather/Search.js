"use client";

import { useState } from "react";
import Image from "next/image";
import searchSvg from "@/public/svgs/search.svg";

export default function Search() {
    const [query, setQuery] = useState("");

    return (
        <div className="relative group flex flex-col items-center">
            <div className="flex justify-between items-center gap-2 border rounded-full px-4 py-1.5 focus-within:ring-2 bg-white/50 backdrop-blur-sm shadow-sm transition-all duration-300">
                <Image
                    src={searchSvg}
                    alt="search"
                    className="w-5 opacity-50"
                />
                <input
                    type="text"
                    placeholder="Search city e.g. London"
                    className="outline-none text-sm bg-transparent w-48 text-zinc-800"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>
    );
}
