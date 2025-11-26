import { useContext, useEffect, useState } from "react";
import "./DropDown.css";
import { WeatherContext } from "./WeatherContext";

const DropDown = () => {
  const { setCity, handleSearch, setForecastTime } = useContext(WeatherContext);

  const [searchValue, setSearchValue] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (searchValue) {
      handleSearch();
    }
  }, [searchValue]);

  useEffect(() => {
    if (time) {
      handleSearch();
    }
  }, [time]);

  return (
    <div className="dropdown-container">
      <select
        className="dropdown"
        name="options"
        onChange={(event) => {
          setSearchValue(event.target.value);
          setCity(event.target.value);
        }}
      >
        <option value="">none</option>
        <option value="London">London</option>
        <option value="Edinburgh">Edinburgh</option>
        <option value="Birmingham">Birmingham</option>
        <option value="Manchester">Manchester</option>
        <option value="Glasgow">Glasgow</option>
        <option value="Bristol">Bristol</option>
      </select>

      <select
        className="dropdown"
        name="options"
        onChange={(event) => {
          setTime(event.target.value);
          setForecastTime(event.target.value);
        }}
      >
        <option value="6:00:00">6:00</option>
        <option value="9:00:00">9:00</option>
        <option value="12:00:00">12:00</option>
        <option value="15:00:00">15:00</option>
        <option value="18:00:00">18:00</option>
        <option value="21:00:00">21:00</option>
      </select>
    </div>
  );
};

export default DropDown;
