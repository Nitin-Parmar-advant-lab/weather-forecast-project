'use client';

import { useState } from "react";
import { getLocationSuggestions } from "@/lib/locationService";
import useData from "./useData";

export default function useFavoriteCities() {
    const { favorites, updateCity, toggleFavorite } = useData();
    const [isAdding, setIsAdding] = useState(false);
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");

    const handleAddCity = async (e) => {
        if (e.key === "Enter") {
            const cityName = query.trim();
            if (cityName) {
                try {
                    const results = await getLocationSuggestions(cityName);
                    const result = results?.[0];

                    if (result) {
                        toggleFavorite({
                            name: result.name,
                            lat: result.latitude,
                            lon: result.longitude,
                            country: result.country,
                        });
                        setQuery("");
                        setIsAdding(false);
                        setError("");
                    } else {
                        setError("City not found. Please try again.");
                    }
                } catch (err) {
                    setError("Failed to verify location.");
                }
            }
        }
    };

    const handleSelectCity = async (city) => {
        if (city.lat && city.lon) {
            updateCity(city);
            setError("");
        } else {
            try {
                const results = await getLocationSuggestions(city.name);
                const result = results?.[0];

                if (result) {
                    updateCity({
                        name: result.name,
                        lat: result.latitude,
                        lon: result.longitude,
                        country: result.country,
                    });
                    setError("");
                } else {
                    setError("City not found");
                }
            } catch (err) {
                setError("Failed to fetch location");
            }
        }
    };

    return {
        favorites,
        toggleFavorite,
        isAdding,
        setIsAdding,
        query,
        setQuery,
        error,
        handleAddCity,
        handleSelectCity,
    };
}
