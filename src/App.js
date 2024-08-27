import { useEffect, useMemo, useState } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./components/api";
import "./App.css";

const App = () => {
  const [init, setInit] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#00003b",
        },
      },
      fpsLimit: 60,
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 15,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 100, 
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "star",
        },
        size: {
          value: { min: 1, max: 3 }, 
        },
      },
      detectRetina: true,
    }),
    []
  );

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
  
    try {
      
      const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
  
      
      const timeZoneDBKey = "D712JPY1LULP"; 
      const timezoneFetch = fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeZoneDBKey}&format=json&by=position&lat=${lat}&lng=${lon}`
      );
  
     
      const [weatherResponse, forecastResponse, timezoneResponse] = await Promise.all([currentWeatherFetch, forecastFetch, timezoneFetch]);
  
      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();
      const timezoneData = await timezoneResponse.json();
  
     
      const localTime = new Date(timezoneData.formatted).toLocaleString();
  
    
      setCurrentWeather({ city: searchData.label, ...weatherData, cityTime: localTime });
      setForecast({ city: searchData.label, ...forecastData });
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="container">
      {init && <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />}
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
};

export default App;
