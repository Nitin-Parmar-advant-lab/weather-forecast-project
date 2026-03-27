import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { formatDailyData, formatHourlyData } from "../lib/weatherUtils";

// two arguments, first action name, and callback function
// Generates promise rejected, pending or fulfilled
export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async ({ lat, lon }) => {
        const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        return {
            current: data.current,
            hourly: formatHourlyData(data.hourly),
            daily: formatDailyData(data.daily),
            units: data.current_units,
        };
    },
);

const weatherSlice = createSlice({
    name: "weather",
    initialState: {
        selectedCity: { name: "London", lat: 51.5074, lon: -0.1278 },
        forecast: null,
        status: "idle",
        error: null,
        unit: "c",
        favorites: [],
    },
    reducers: {
        setCity: (state, action) => {
            state.selectedCity = action.payload;
        },
        toggleUnit: (state) => {
            state.unit = state.unit === "c" ? "f" : "c";
        },
        addToFavorites: (state, action) => {
            if (
                !state.favorites.some(
                    (city) => city.name === action.payload.name,
                )
            ) {
                state.favorites.push(action.payload);
            }
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(
                (city) => city.name !== action.payload.name,
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.forecast = action.payload;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const weatherAction = weatherSlice.actions;
export default weatherSlice.reducer;
