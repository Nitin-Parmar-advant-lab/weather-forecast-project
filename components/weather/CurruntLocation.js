"use client";

import Image from "next/image";
import locationSvg from "@/public/svgs/location.svg";
import useData from "@/hooks/useData";
export default function CurruntLocation() {
    const { selectedCity } = useData();

    return (
        <div className="flex justify-between items-center gap-2 mr-2">
            <div>
                <Image src={locationSvg} alt="location" className="w-5 opacity-40 invert" />
            </div>
            <div className="text-white/60 text-base font-semibold">
                {selectedCity.name} 
            </div>
        </div>
    );
}
