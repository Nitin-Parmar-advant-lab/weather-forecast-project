"use client"

import Image from "next/image";
import locationSvg from "@/public/svgs/location.svg";
import useData from "@/hooks/useData";
export default function CurruntLocation() {
    const { selectedCity } = useData();

    return (
        <div className="flex justify-between items-center gap-0.5">
            <div>
                <Image src={locationSvg} alt="location" className="w-5" />
            </div>
            <div>{selectedCity.name}</div>
        </div>
    );
}
