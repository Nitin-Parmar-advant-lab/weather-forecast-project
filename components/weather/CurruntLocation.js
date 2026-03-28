"use client";

import Image from "next/image";
import locationSvg from "@/public/svgs/location.svg";
import useData from "@/hooks/useData";
export default function CurruntLocation() {
    const { selectedCity } = useData();

    return (
        <div className="flex justify-between items-center gap-0.5">
            <div>
                <Image src={locationSvg} alt="location" className="w-5 opacity-60" />
            </div>
            <div className="text-zinc-500 text-lg font-semibold">
                {selectedCity.name} 
            </div>
        </div>
    );
}
