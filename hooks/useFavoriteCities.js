'use client';

import { useState } from "react";
import { getLocationSuggestions } from "@/lib/locationService";
import useData from "./useData";
import useLocationSearch from "./useLocationSearch";

export default function useFavoriteCities() {
    const { favorites, updateCity, toggleFavorite } = useData();
    const [isAdding, setIsAdding] = useState(false);
    const { query, setQuery, suggestions, setSuggestions } = useLocationSearch();
    const [error, setError] = useState("");

    const handleSetQuery = (val) => {
        setQuery(val);
        if (error) setError("");
    };

    const handleSetIsAdding = (val) => {
        setIsAdding(val);
        if (error) setError("");
        if (!val) {
            setQuery("");
            setSuggestions([]);
        }
    };

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
                        setSuggestions([]);
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

    const handleAddSuggestion = (city) => {
        toggleFavorite({
            name: city.name,
            lat: city.latitude,
            lon: city.longitude,
            country: city.country,
        });
        setQuery("");
        setSuggestions([]);
        setIsAdding(false);
        setError("");
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
        setIsAdding: handleSetIsAdding,
        query,
        setQuery: handleSetQuery,
        suggestions,
        error,
        handleAddCity,
        handleAddSuggestion,
        handleSelectCity,
    };
}
