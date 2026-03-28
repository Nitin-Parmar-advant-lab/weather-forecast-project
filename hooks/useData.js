"use client";

import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherAction, fetchWeather } from "@/store/weatherSlice";
import { convertWeatherForecast } from "@/lib/weatherUtils";

export default function useData() {
    const dispatch = useDispatch();

    const { selectedCity, forecast, status, error, unit, favorites } =
        useSelector((state) => state.weather);

    const refreshWeather = useCallback(() => {
        if (selectedCity?.lat && selectedCity?.lon) {
            dispatch(
                fetchWeather({ lat: selectedCity.lat, lon: selectedCity.lon }),
            );
        }
    }, [dispatch, selectedCity]);

    useEffect(() => {
        refreshWeather();
    }, [refreshWeather]);

    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem("weather_favorites");
        if (savedFavorites) {
            dispatch(weatherAction.setFavorites(JSON.parse(savedFavorites)));
        }
    }, [dispatch]);

    // Save favorites to localStorage
    useEffect(() => {
        if (favorites.length > 0 || localStorage.getItem("weather_favorites")) {
            localStorage.setItem("weather_favorites", JSON.stringify(favorites));
        }
    }, [favorites]);

    const updateCity = (cityData) => {
        dispatch(weatherAction.setCity(cityData));
    };

    const toggleTemperatureUnit = () => {
        dispatch(weatherAction.toggleUnit());
    };

    const toggleFavorite = (city) => {
        const isFavorite = favorites.some((f) => f.name === city.name);
        if (isFavorite) {
            dispatch(weatherAction.removeFromFavorites(city));
        } else {
            dispatch(weatherAction.addToFavorites(city));
        }
    };

    const convertedForecast = convertWeatherForecast(forecast, unit);

    return {
        weatherData: convertedForecast,
        selectedCity,
        isLoading: status === "loading",
        error,
        unit,
        favorites,
        updateCity,
        toggleTemperatureUnit,
        refreshWeather,
        toggleFavorite,
    };
}
