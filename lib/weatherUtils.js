export function getWeatherDescription(code) {
    const weatherCodes = {
        0: { description: "Clear sky", icon: "sun" },
        1: { description: "Mainly clear", icon: "sun-cloud" },
        2: { description: "Partly cloudy", icon: "cloud-sun" },
        3: { description: "Overcast", icon: "cloud" },
        45: { description: "Fog", icon: "fog" },
        48: { description: "Depositing rime fog", icon: "fog" },
        51: { description: "Light drizzle", icon: "cloud-rain" },
        53: { description: "Moderate drizzle", icon: "cloud-rain" },
        55: { description: "Dense drizzle", icon: "cloud-rain" },
        56: { description: "Light freezing drizzle", icon: "cloud-snow" },
        57: { description: "Dense freezing drizzle", icon: "cloud-snow" },
        61: { description: "Slight rain", icon: "cloud-rain" },
        63: { description: "Moderate rain", icon: "cloud-rain" },
        65: { description: "Heavy rain", icon: "cloud-showers-heavy" },
        66: { description: "Light freezing rain", icon: "cloud-snow" },
        67: { description: "Heavy freezing rain", icon: "cloud-snow" },
        71: { description: "Slight snow fall", icon: "snowflake" },
        73: { description: "Moderate snow fall", icon: "snowflake" },
        75: { description: "Heavy snow fall", icon: "snowflake" },
        77: { description: "Snow grains", icon: "snowflake" },
        80: { description: "Slight rain showers", icon: "cloud-rain" },
        81: {
            description: "Moderate rain showers",
            icon: "cloud-showers-heavy",
        },
        82: {
            description: "Violent rain showers",
            icon: "cloud-showers-heavy",
        },
        85: { description: "Slight snow showers", icon: "snowflake" },
        86: { description: "Heavy snow showers", icon: "snowflake" },
        95: { description: "Thunderstorm", icon: "cloud-lightning" },
        96: {
            description: "Thunderstorm with slight hail",
            icon: "cloud-lightning",
        },
        99: {
            description: "Thunderstorm with heavy hail",
            icon: "cloud-lightning",
        },
    };

    return (
        weatherCodes[code] || { description: "Unknown State", icon: "cloud" }
    );
}

export function cToF(celsius) {
    return (celsius * 9) / 5 + 32;
}

export function fToC(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
}

export function convertTemperature(temp, toUnit) {
    if (temp === null || temp === undefined) return temp;
    if (toUnit === "f") {
        return Math.round(cToF(temp) * 10) / 10;
    }
    return Math.round(temp * 10) / 10;
}

export function convertWeatherForecast(forecast, unit) {
    if (!forecast || unit === "c") return forecast;

    const converted = {
        ...forecast,
        current: forecast.current ? {
            ...forecast.current,
            temperature_2m: convertTemperature(forecast.current.temperature_2m, unit),
            apparent_temperature: convertTemperature(forecast.current.apparent_temperature, unit),
        } : null,
        hourly: forecast.hourly?.map((h) => ({
            ...h,
            temperature: convertTemperature(h.temperature, unit),
        })) || [],
        daily: forecast.daily?.map((d) => ({
            ...d,
            maxTemp: convertTemperature(d.maxTemp, unit),
            minTemp: convertTemperature(d.minTemp, unit),
        })) || [],
        units: forecast.units ? {
            ...forecast.units,
            temperature_2m: unit === "f" ? "°F" : "°C",
            apparent_temperature: unit === "f" ? "°F" : "°C",
            temperature_2m_max: unit === "f" ? "°F" : "°C",
            temperature_2m_min: unit === "f" ? "°F" : "°C",
        } : null,
    };

    return converted;
}

export function formatHourlyData(hourlyData, limit = 24) {
    if (!hourlyData || !hourlyData.time) {
        return [];
    }

    const formatted = [];

    for (let i = 0; i < limit; i++) {
        formatted.push({
            time: hourlyData.time[i],
            temperature: hourlyData.temperature_2m[i],
            weatherCode: hourlyData.weather_code[i],
        });
    }

    return formatted;
}

export function formatDailyData(dailyData) {
    if (!dailyData || !dailyData.time) {
        return [];
    }

    const formatted = [];
    
    for (let i = 0; i < dailyData.time.length; i++) {
        formatted.push({
            time: dailyData.time[i],
            maxTemp: dailyData.temperature_2m_max[i],
            minTemp: dailyData.temperature_2m_min[i],
            weatherCode: dailyData.weather_code[i],
        });
    }

    return formatted;
}
