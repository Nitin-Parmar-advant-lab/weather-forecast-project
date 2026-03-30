import { NextResponse } from "next/server";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q");

    if (!q) {
        return NextResponse.json(
            {
                error: "City name required.",
            },
            { status: 400 },
        );
    }

    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=5&language=en&format=json`;

        const res = await fetch(url, {
            next: { revalidate: 86400 }, 
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch from Open-Meteo: ${res.status}`);
        }

        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Geocoding API Error:", error);

        return NextResponse.json(
            { error: "Failed to fetch location data" },
            { status: 500 },
        );
    }
}
