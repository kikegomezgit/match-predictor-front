import { Cloud, CloudRain, Sun, CloudSnow, Wind, Droplets } from 'lucide-react';

export const getWeatherIcon = (weather?: string) => {
  if (!weather) return Sun;
  
  const weatherLower = weather.toLowerCase();
  
  if (weatherLower.includes('rain') || weatherLower.includes('drizzle')) {
    return CloudRain;
  }
  if (weatherLower.includes('snow')) {
    return CloudSnow;
  }
  if (weatherLower.includes('cloud')) {
    return Cloud;
  }
  if (weatherLower.includes('wind')) {
    return Wind;
  }
  if (weatherLower.includes('mist') || weatherLower.includes('fog')) {
    return Droplets;
  }
  
  return Sun;
};

export const getWeatherEmoji = (weather?: string) => {
  if (!weather) return '☀️';
  
  const weatherLower = weather.toLowerCase();
  
  if (weatherLower.includes('rain') || weatherLower.includes('drizzle')) {
    return '🌧️';
  }
  if (weatherLower.includes('snow')) {
    return '❄️';
  }
  if (weatherLower.includes('cloud')) {
    return '☁️';
  }
  if (weatherLower.includes('clear')) {
    return '☀️';
  }
  if (weatherLower.includes('mist') || weatherLower.includes('fog')) {
    return '🌫️';
  }
  
  return '☀️';
};

