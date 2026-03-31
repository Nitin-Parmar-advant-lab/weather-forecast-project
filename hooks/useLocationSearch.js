'use client';

import { useState, useEffect } from "react";
import { getLocationSuggestions } from "@/lib/locationService";

export default function useLocationSearch(delay = 500) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim().length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const results = await getLocationSuggestions(query);
                setSuggestions(results);
            } catch (err) {
                setSuggestions([]);
            }
        };

        const timer = setTimeout(fetchSuggestions, delay);
        return () => clearTimeout(timer);
    }, [query, delay]);

    return {
        query,
        setQuery,
        suggestions,
        setSuggestions,
    };
}
