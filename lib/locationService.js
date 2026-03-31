export async function getLocationSuggestions(query) {
    if (!query || query.trim().length < 2) {
        return [];
    }

    try {
        const response = await fetch(`/api/location?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            throw new Error(`Location API error: ${response.status}`);
        }

        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Failed to fetch location suggestions:", error);
        throw error;
    }
}
