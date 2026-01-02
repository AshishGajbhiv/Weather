import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Weather code grouping utility
const getWeatherType = (code, isDay) => {
    if (isDay === 0) return 'night';

    // WMO Weather interpretation codes
    // Rain: 51, 53, 55 (Drizzle), 61, 63, 65 (Rain), 80, 81, 82 (Showers), 95, 96, 99 (Thunderstorm)
    const rainCodes = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99];
    // Snow: 71, 73, 75 (Snow fall), 77 (Snow grains), 85, 86 (Snow showers)
    const snowCodes = [71, 73, 75, 77, 85, 86];

    if (rainCodes.includes(code)) return 'rain';
    if (snowCodes.includes(code)) return 'snow';

    return 'sunny'; // Default/Sunny/Cloudy
};

const GenerateStars = () => {
    const stars = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 2,
        }));
    }, []);

    return (
        <>
            {/* Moon */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-10 right-10 w-24 h-24 rounded-full bg-slate-100 shadow-[0_0_60px_rgba(255,255,255,0.3)] z-0 overflow-hidden"
            >
                <div className="absolute w-full h-full bg-slate-200 opacity-20 rounded-full blur-xl scale-90 top-[-10%] left-[-10%]" />
            </motion.div>

            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute bg-white rounded-full"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{
                        duration: 2 + star.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </>
    );
};

const GenerateRain = () => {
    const drops = useMemo(() => Array.from({ length: 100 }), []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {drops.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0 }}
                    animate={{ y: "105vh", opacity: 1, x: `calc(${Math.random() * 100}vw - 50px)` }}
                    transition={{
                        duration: 0.6 + Math.random() * 0.4,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "linear",
                    }}
                    className="absolute top-0 w-[1px] h-6 bg-blue-200/40 rotate-[15deg] origin-top"
                />
            ))}
        </div>
    );
}


const GenerateSnow = () => {
    const flakes = useMemo(() => Array.from({ length: 50 }), []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {flakes.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0 }}
                    animate={{
                        y: "105vh",
                        opacity: [0, 0.8, 0],
                        x: [
                            `${Math.random() * 100}vw`,
                            `calc(${Math.random() * 100}vw + ${Math.random() * 100 - 50}px)`,
                            `calc(${Math.random() * 100}vw - ${Math.random() * 100 - 50}px)`
                        ]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear",
                        times: [0, 0.5, 1] // Keyframe timing
                    }}
                    className="absolute top-0 bg-white rounded-full blur-[1px]"
                    style={{
                        width: Math.random() * 4 + 2 + "px",
                        height: Math.random() * 4 + 2 + "px",
                    }}
                />
            ))}
        </div>
    );
};

const GenerateSunParticles = () => {
    const particles = useMemo(() => Array.from({ length: 20 }), []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: "100vh", x: Math.random() * 100 + "vw" }}
                    animate={{ opacity: [0, 0.6, 0], y: "-10vh" }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear",
                    }}
                    className="absolute w-1 h-1 bg-yellow-100 rounded-full blur-[0.5px]"
                />
            ))}

            {/* Sun Glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute top-[-15%] right-[-15%] w-[600px] h-[600px] bg-orange-400/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"
            />
            <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-200/40 rounded-full blur-[60px]" />
        </div>
    );
}

const BackgroundManager = ({ weatherCode, isDay }) => {
    const weatherType = getWeatherType(weatherCode, isDay);

    const backgrounds = {
        sunny: "bg-gradient-to-br from-blue-400 to-orange-300 dark:from-slate-800 dark:to-slate-900",
        night: "bg-gradient-to-b from-slate-900 via-indigo-950 to-black", // Deep Night
        rain: "bg-gradient-to-b from-slate-700 via-slate-600 to-slate-800", // Gloomy Grey
        snow: "bg-gradient-to-b from-blue-100 via-blue-200 to-white dark:from-slate-800 dark:via-blue-900 dark:to-slate-800", // Cold Blue
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 -z-10 transition-colors duration-1000 ease-in-out ${backgrounds[weatherType]} overflow-hidden`}
        >
            <AnimatePresence mode="wait">
                {weatherType === 'night' && (
                    <motion.div
                        key="night"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <GenerateStars />
                    </motion.div>
                )}
                {weatherType === 'rain' && (
                    <motion.div
                        key="rain"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <GenerateRain />
                    </motion.div>
                )}
                {weatherType === 'snow' && (
                    <motion.div
                        key="snow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <GenerateSnow />
                    </motion.div>
                )}
                {weatherType === 'sunny' && (
                    <motion.div
                        key="sunny"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <GenerateSunParticles />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default BackgroundManager;
