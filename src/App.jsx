import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import BackgroundManager from './components/BackgroundManager';
import { getCityCoordinates, getWeather, requiresHighContrastText, getCityFromCoordinates } from './services/WeatherService';
import { motion, AnimatePresence } from 'framer-motion';

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initial fetch for a default city
  useEffect(() => {
    handleSearch('New York');
  }, []);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const coords = await getCityCoordinates(city);
      setCityData(coords);
      const weatherData = await getWeather(coords.latitude, coords.longitude);
      setWeather(weatherData);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
      setCityData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const coords = await getCityFromCoordinates(latitude, longitude);
            setCityData(coords);
            const weatherData = await getWeather(latitude, longitude);
            setWeather(weatherData);
          } catch (err) {
            setError('Failed to fetch location data.');
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setLoading(false);
          setError('Location access denied. Please enable permissions.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">

      {/* Dynamic Background */}
      <BackgroundManager
        weatherCode={weather?.current?.weather_code}
        isDay={weather?.current?.is_day ?? 1}
      />

      {/* Background Decor Elements - Optional for 'premium' feel - Kept but made more subtle as BackgroundManager handles main ambiance */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-300/10 dark:bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-300/10 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <header className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </header>

      <main className="flex flex-col items-center w-full max-w-lg z-0">
        <div className="text-center mb-10">
          <h1 className={`text-4xl md:text-5xl font-black tracking-tighter mb-2 ${weather && requiresHighContrastText(weather.current.weather_code, weather.current.is_day)
            ? 'text-white'
            : 'text-slate-800 dark:text-white'
            }`}>
            Weather<span className="text-orange-500 dark:text-blue-400">.</span>
          </h1>
          <p className={`font-medium ${weather && requiresHighContrastText(weather.current.weather_code, weather.current.is_day)
            ? 'text-slate-200'
            : 'text-slate-500 dark:text-slate-400'
            }`}>
            Forecasts & Conditions
          </p>
        </div>

        <SearchBar onSearch={handleSearch} onLocationClick={handleCurrentLocation} isLoading={loading} />

        <div className="w-full min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-300 text-center font-medium"
              >
                {error}
              </motion.div>
            ) : (
              <WeatherCard key="weather" weather={weather} cityData={cityData} />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WeatherApp />
    </ThemeProvider>
  );
}