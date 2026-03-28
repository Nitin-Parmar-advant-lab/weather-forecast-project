"use server";

export async function searchLocation(query) {
    if (!query || query.trim().length < 2) return null;

    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
        const res = await fetch(url);

        if (!res.ok) throw new Error("Failed to fetch location data");

        const data = await res.json();
        return data.results?.[0] || null;
    } catch (error) {
        console.error("Server Action Error:", error);
        return null;
    }
}
