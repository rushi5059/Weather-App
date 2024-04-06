import React, { useState, useEffect } from "react";
import "../components/css/Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=2aj7QwO7BAn76KjXQ6V8Ww5QMcPefSJU`
      );
      const data = await response.json();
      setWeatherData(data.data.values);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please try again.");
    }
  };

  useEffect(() => {
    if (!city) {
      setWeatherData({
        temperature: "N/A",
        humidity: "N/A",
        cloudCover: "N/A",
        dewPoint: "N/A",
        pressureSurfaceLevel: "N/A",
      });
    } else {
      handleSearch();
    }
  }, [city]); // Dependency array with 'city', so it runs whenever 'city' changes

  return (
    <div className="weather-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>Weather Information</h2>
          <ul>
            <li>Temperature: {weatherData.temperature}°C</li>
            <li>Humidity: {weatherData.humidity}%</li>
            <li>Cloud Cover: {weatherData.cloudCover}%</li>
            <li>Dew Point: {weatherData.dewPoint}°C</li>
            <li>Pressure: {weatherData.pressureSurfaceLevel} hPa</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Weather;
