import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Wind } from 'lucide-react';

const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export async function getCityCoordinates(city) {
    try {
        const response = await fetch(`${GEO_API_URL}?name=${city}&count=1&language=en&format=json`);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error('City not found');
        }

        return {
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude,
            name: data.results[0].name,
            country: data.results[0].country,
        };
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        throw error;
    }
}

export async function getCityFromCoordinates(lat, lon) {
    try {
        const response = await fetch(`${GEO_API_URL}?name=${lat},${lon}&count=1&language=en&format=json`);
        // Note: Open-Meteo Geocoding API uses a different endpoint/format for reverse geocoding usually, 
        // but looking at docs, standard 'search' might not work for reverse. 
        // Let's use the correct Open-Meteo Reverse Geocoding API endpoint.
        // Actually, the previous URL was for search. We need to check if the user wants me to use a specific API. 
        // The implementation plan said: https://geocoding-api.open-meteo.com/v1/reverse

        const REVERSE_GEO_URL = 'https://geocoding-api.open-meteo.com/v1/reverse';
        const res = await fetch(`${REVERSE_GEO_URL}?latitude=${lat}&longitude=${lon}&count=1&language=en&format=json`);
        const data = await res.json();

        if (!data.results || data.results.length === 0) {
            throw new Error('Location not found');
        }

        return {
            latitude: data.results[0].latitude,
            longitude: data.results[0].longitude,
            name: data.results[0].name,
            country: data.results[0].country,
        };
    } catch (error) {
        console.error("Error fetching city from coordinates:", error);
        throw error;
    }
}

export async function getWeather(lat, lon) {
    try {
        const response = await fetch(
            `${WEATHER_API_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
}

export function getWeatherIcon(code) {
    // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
    if (code === 0 || code === 1) return Sun; // Clear, Main Clear
    if (code === 2 || code === 3) return Cloud; // Partly cloudy, Overcast
    if ([45, 48].includes(code)) return CloudFog; // Fog
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return CloudRain; // Drizzle, Rain
    if ([71, 73, 75, 77, 85, 86].includes(code)) return CloudSnow; // Snow
    if ([95, 96, 99].includes(code)) return CloudLightning; // Thunderstorm

    return Sun; // Default
}

export function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Slight snow fall',
        73: 'Moderate snow fall',
        75: 'Heavy snow fall',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail',
    };
    return descriptions[code] || 'Unknown';
}

export function requiresHighContrastText(code, isDay) {
    if (isDay === 0) return true; // Night always needs light text
    const darkWeatherCodes = [
        51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99 // Rain/Thunderstorm
    ];
    return darkWeatherCodes.includes(code);
}
