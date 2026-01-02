import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 group"
            aria-label="Toggle Theme"
        >
            <div className="relative w-6 h-6">
                <motion.div
                    initial={false}
                    animate={{
                        scale: theme === 'light' ? 1 : 0,
                        rotate: theme === 'light' ? 0 : 90,
                        opacity: theme === 'light' ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center text-orange-500"
                >
                    <Sun size={24} fill="currentColor" className="group-hover:text-orange-400 transition-colors" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        scale: theme === 'dark' ? 1 : 0,
                        rotate: theme === 'dark' ? 0 : -90,
                        opacity: theme === 'dark' ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center text-blue-400"
                >
                    <Moon size={24} fill="currentColor" className="group-hover:text-blue-300 transition-colors" />
                </motion.div>
            </div>
        </button>
    );
}
