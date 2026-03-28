import { NextResponse } from "next/server";

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
        return NextResponse.json(
            { error: "lat and lon are required." },
            { status: 400 },
        );
    }

    try {
        const unitParam = searchParams.get("unit") === "f" ? "fahrenheit" : "celsius";
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${unitParam}`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Failed to fetch weather data: ${res.status}`);
        }

        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Weather API Error:", error);

        return NextResponse.json(
            { error: "Failed to fetch weather data" },
            { status: 500 },
        );
    }
}
