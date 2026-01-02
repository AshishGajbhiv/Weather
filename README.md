# 🌦️ Weather App

A modern, fast, and visually stunning weather application built with React, Vite, and Tailwind CSS. The app features dynamic animated backgrounds that change based on the real-time weather conditions and time of day.

## ✨ Features

- **Real-Time Weather Data**: Fetches accurate weather information using the Open-Meteo API.
- **Dynamic Backgrounds**: Immersive animated backgrounds powered by `framer-motion`:
  - ☀️ **Sunny**: Warm gradients with floating sun particles.
  - 🌧️ **Rain**: Gloomy skies with realistic diagonal rain animations.
  - ❄️ **Snow**: Cold atmosphere with drifting snowflakes.
  - 🌙 **Night**: Deep night sky with twinkling stars and a glowing moon.
- **Dark/Light Mode**: Fully responsive theme toggle with persistent state.
- **Smart Contrast**: Automatically adjusts text color (White/Black) based on the background brightness (e.g., white text during rainy days or nights).
- **Responsive Design**: Optimized for all devices, from mobile to desktop.
- **Current Location**: (Feature ready) Support for geolocation-based weather.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [Open-Meteo](https://open-meteo.com/) (No API key required)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AshishGajbhiv/Weather.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── components/
│   ├── BackgroundManager.jsx  # Handles dynamic weather animations
│   ├── SearchBar.jsx          # City search input
│   ├── ThemeToggle.jsx        # Light/Dark mode switch
│   └── WeatherCard.jsx        # Displays weather info & time
├── context/
│   └── ThemeContext.jsx       # Global theme state management
├── services/
│   └── WeatherService.js      # Open-Meteo API integration
├── App.jsx                    # Main application layout
└── index.css                  # Tailwind imports & global styles
```

## 🎨 Customizing

### Backgrounds
You can tweak the animations in `src/components/BackgroundManager.jsx`. The app uses `framer-motion` for particle effects (rain, snow, stars).

### Themes
The theme colors are defined using Tailwind's dark mode classes (`dark:...`). You can modify the color palette in `index.css` or directly in the components.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
