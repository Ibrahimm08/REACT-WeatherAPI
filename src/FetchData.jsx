import axios from "axios";
import { useContext } from "react";
import { WeatherContext } from "./WeatherContext";

const fetchData = async (
  searchQuery,
  API,
  API_KEY,
  lon,
  lat,
  units,
  currentTime,
) => {
  let response;
  if (
    localStorage.getItem(searchQuery) &&
    parseInt(localStorage.getItem("currentTime")) - currentTime <= 15
  ) {
    console.log("Used storage");
    return JSON.parse(localStorage.getItem(searchQuery));
  } else {
    try {
      response = await axios.get(API, {
        params: {
          q: searchQuery,
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: units,
        },
      });
    } catch (Error) {
      console.error("error, data not found...");
      return false;
    }
    localStorage.setItem("currentTime", currentTime);
    localStorage.setItem(searchQuery, JSON.stringify(response.data));
    return response.data;
  }
};

export default fetchData;
