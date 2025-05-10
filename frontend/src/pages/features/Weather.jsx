// src/pages/weather/Weather.jsx
import React, { useEffect, useState } from "react";
import "../../styles/features/weather.css";
import skyBackground from "../../resources/images/weather/weatherbackground.jpeg"; // background image

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    console.log("API KEY:", API_KEY);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Colombo&units=metric&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        console.log("API response:", data); 
        if (data.cod !== 200) {
          console.error("API Error:", data.message);
          setWeatherData(null);
        } else {
          setWeatherData(data);
        }
      })
      .catch(err => console.error("Failed to fetch weather data", err));
  }, []);

  return (
    <div className="weather-page" style={{ backgroundImage: `url(${skyBackground})` }}>
      <div className="weather-card">
        <div className="weather-header">
          <h2>Weather</h2>
          <p className="time">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
        </div>

        {weatherData && weatherData.main && weatherData.weather && weatherData.sys && weatherData.wind ? (
          <>
            <div className="weather-main">
              <div className="temperature">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt="Weather Icon"
                  className="weather-icon"
                />
                <h1>{Math.round(weatherData.main.temp)}°C</h1>
              </div>
              <p className="description">{weatherData.weather[0].description}</p>
              <p className="location">{weatherData.name}, {weatherData.sys.country}</p>
            </div>

            <div className="weather-details">
              <div><strong>Feels Like:</strong> {Math.round(weatherData.main.feels_like)}°C</div>
              <div><strong>Wind:</strong> {weatherData.wind.speed} km/h</div>
              <div><strong>Humidity:</strong> {weatherData.main.humidity}%</div>
              <div><strong>Pressure:</strong> {weatherData.main.pressure} hPa</div>
            </div>
          </>
        ) : (
          <p className="loading-text">Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default Weather;

