import { useContext, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import FetchWeather from "./Weather";
import fetchData from "./FetchData";
import image from "./assets/image.png";
import DropDown from "./DropDown";
import GlassFilter from "./Filter";
import Input from "./Input";
import { WeatherContext } from "./WeatherContext";

function App() {
  const {
    city,
    setCity,
    isLoading,
    currConditon,
    handleSearch,
    success,
    error,
    toggleUnits,
  } = useContext(WeatherContext);

  useEffect(() => {
    let theme;
    if (currConditon) {
      currConditon.split(" ").length > 1
        ? (theme = currConditon.split(" ")[1])
        : (theme = currConditon);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [currConditon]);

  return (
    <div className="container">
      <GlassFilter />
      <div className="glass"></div>
      <img src={image} alt="" className="cloud" />
      <Input
        type={"text"}
        text={"Search forcast for city"}
        value={city}
        onchange={(event) => setCity(event.target.value)}
        className="searchbar"
      />
      <button className="search-btn" onClick={handleSearch}>
        🔍
      </button>
      <DropDown className="dropdown" />
      <Input
        type={"button"}
        text={""}
        value={"Get current location"}
        onclick={() => navigator.geolocation.getCurrentPosition(success, error)}
      />
      <label className="checkboxlabel">
        <Input
          type={"checkbox"}
          id="checkbox"
          onchange={(event) => toggleUnits(event.target.checked)}
        />
        <span className="slider round"></span>
      </label>

      {isLoading ? <p>Loading...</p> : <FetchWeather />}
    </div>
  );
}

export default App;
