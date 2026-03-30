"use client";

import { useCallback, useMemo } from "react";
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

    const convertedForecast = useMemo(() => {
        return convertWeatherForecast(forecast, unit);
    }, [forecast, unit]);

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
