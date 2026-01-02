import React, { useState, useEffect } from 'react';
import { Droplets, Wind, User, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { getWeatherIcon, getWeatherDescription, requiresHighContrastText } from '../services/WeatherService';

export default function WeatherCard({ weather, cityData }) {
    if (!weather || !cityData) return null;

    const current = weather.current;
    const WeatherIcon = getWeatherIcon(current.weather_code);
    const description = getWeatherDescription(current.weather_code);
    const forceLightText = requiresHighContrastText(current.weather_code, current.is_day);

    // Format Local Time
    const [time, setTime] = useState('');

    useEffect(() => {
        if (weather.timezone) {
            const updateTime = () => {
                const now = new Date();
                const options = {
                    timeZone: weather.timezone,
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short'
                };
                setTime(new Intl.DateTimeFormat('en-US', options).format(now));
            };

            updateTime();
            const timer = setInterval(updateTime, 1000 * 60); // Update every minute
            return () => clearInterval(timer);
        }
    }, [weather.timezone]);

    const DayNightIcon = current.is_day === 1 ? Sun : Moon;

    const textColorClass = forceLightText ? 'text-white' : 'text-slate-800 dark:text-white';
    const subTextColorClass = forceLightText ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400';
    const iconColorClass = forceLightText ? 'text-white' : 'text-slate-500 dark:text-slate-400';


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full max-w-md bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl ${textColorClass}`}
        >
            <div className="flex flex-col items-center relative">

                {/* Day/Night Indicator Token */}
                <div className={`absolute top-0 right-0 p-2 rounded-full ${forceLightText ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                    <DayNightIcon size={20} className={iconColorClass} />
                </div>

                <h2 className="text-3xl font-bold tracking-tight mb-1">{cityData.name}</h2>
                <div className={`flex flex-col items-center mb-8 ${subTextColorClass}`}>
                    <p className="text-sm font-medium">{cityData.country}</p>
                    <p className="text-xs mt-1 font-medium opacity-80">{time}</p>
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 p-4 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-indigo-500/20 dark:to-purple-500/20 rounded-full shadow-inner"
                >
                    <WeatherIcon size={80} className="text-orange-500 dark:text-indigo-300" />
                </motion.div>

                <div className="text-center mb-8">
                    <h1 className="text-7xl font-bold mb-2 tracking-tighter">
                        {Math.round(current.temperature_2m)}°
                    </h1>
                    <p className="text-xl font-medium capitalize opacity-80">{description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="flex flex-col items-center p-3 bg-white/40 dark:bg-white/5 rounded-2xl border border-white/20 dark:border-white/5 shadow-sm">
                        <Wind size={20} className={`mb-2 ${iconColorClass}`} />
                        <span className="text-lg font-semibold">{current.wind_speed_10m}</span>
                        <span className="text-xs opacity-60">km/h</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-white/40 dark:bg-white/5 rounded-2xl border border-white/20 dark:border-white/5 shadow-sm">
                        <Droplets size={20} className={`mb-2 ${forceLightText ? 'text-blue-300' : 'text-blue-500 dark:text-blue-400'}`} />
                        <span className="text-lg font-semibold">{current.relative_humidity_2m}%</span>
                        <span className="text-xs opacity-60">Humidity</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-white/40 dark:bg-white/5 rounded-2xl border border-white/20 dark:border-white/5 shadow-sm">
                        <User size={20} className={`mb-2 ${forceLightText ? 'text-purple-300' : 'text-purple-500 dark:text-purple-400'}`} />
                        <span className="text-lg font-semibold">{Math.round(current.apparent_temperature)}°</span>
                        <span className="text-xs opacity-60">Feels Like</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
