import { createContext, useRef, useState } from "react";
import fetchData from "./FetchData";

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const API_KEY = import.meta.env.VITE_WEATHER_KEY;
  const API = "https://api.openweathermap.org/data/2.5/forecast";

  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState();
  const [forecastTime, setForecastTime] = useState("6:00:00");
  const [currConditon, setCurrCondition] = useState("");
  const [units, setUnits] = useState("metric");
  const currentTime = `${new Date().getHours()}${new Date().getMinutes()}`;

  const [history, setHistory] = useState([]);
  const [filterSuggest, setFilterSuggest] = useState([]);
  const maxHistory = 10; // Controls how many suggestions appear at once

  const saveSearch = (savingItem) => {
    const updated = [
      savingItem,
      ...history.filter((item) => item !== savingItem),
    ].slice(0, maxHistory);
    setHistory(updated);
    localStorage.setItem("searchHistory", JSON.stringify(updated));
  };
  

  const handleSearch = async (lon, lat, gotUnits) => {
    setWeatherData(false);
    saveSearch(city);
    setIsLoading(true);
    setTimeout(async () => {
      const data = await fetchData(
        city,
        API,
        API_KEY,
        lon,
        lat,
        gotUnits ? gotUnits : units,
        currentTime
      );
      setWeatherData(data);
      setIsLoading(false);
    }, 500);
  };

  const success = (position) => {
    setCity("");
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    handleSearch(lon, lat);
  };

  const error = (err) => {
    alert(
      "Sorry, something went wrong - check site permissions and location access"
    );
    console.error(err);
  };

  const toggleUnits = (value) => {
    const newUnits = value ? "imperial" : "metric";
    setUnits(newUnits);
    console.log(newUnits, value);
    handleSearch(false, undefined, undefined, newUnits);
  };

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        isLoading,
        weatherData,
        forecastTime,
        setForecastTime,
        currConditon,
        setCurrCondition,
        handleSearch,
        success,
        error,
        units,
        toggleUnits,
        currentTime,
        history,
        setHistory,
        filterSuggest,
        setFilterSuggest,
        saveSearch,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
