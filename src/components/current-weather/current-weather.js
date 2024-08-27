import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {

  const weatherCondition = data.weather[0].main.toLowerCase(); 

  const getWeatherClass = (condition) => {
    switch (condition) {
      case "clear":
        return "sunny";
      case "clouds":
        return "cloudy";
      case "rain":
      case "drizzle":
        return "rainy";
      case "snow":
        return "snowy";
      case "thunderstorm":
        return "thunderstorm";
      default:
        return "";
    }
  };

  return (
    <div className={`weather ${getWeatherClass(weatherCondition)}`}>
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
          <p className="current-time">Local Time: {data.cityTime}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
