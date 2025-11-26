import { useContext, useEffect } from "react";
import "./Weather.css";
import { WeatherContext } from "./WeatherContext";

const FetchWeather = () => {
  const { weatherData, forecastTime, setCurrCondition, units } =
    useContext(WeatherContext);

  const filteredWeather = weatherData?.list?.filter((entry) =>
    entry.dt_txt.includes(forecastTime)
  ); // Filters weather for 5 days at 12:00:00

  useEffect(() => {
    if (filteredWeather) {
      setCurrCondition(filteredWeather[0].weather[0].description);
    }
  }, [filteredWeather]);

  function iconGet(icon_code) {
    return (
      <div>
        <p>
          <img
            className="symbol"
            src={`https://openweathermap.org/img/wn/${icon_code}@2x.png`}
            alt="Weather Icon"
          />
        </p>
      </div>
    );
  }

  return (
    <div className="display">
      {filteredWeather ? (
        <div className="weather">
          <h2>
            5-Day Forecast for
            <span className="name"> {weatherData.city.name}</span>
          </h2>

          <div className="forecast">
            {filteredWeather?.map((forecast, index) => (
              <div key={index} className="conditions">
                <p>
                  <strong>{forecast.dt_txt.split(" ")[0]}</strong>
                </p>
                <p>
                  <span className="symbol">☀️</span>
                  {forecast.main.temp}{units == "metric"? <> °C</> : <> °F</>}
                </p>
                <h3 className="has-weather-icon">
                  {iconGet(forecast.weather[0].icon)}
                  {forecast.weather[0].description}
                </h3>
                <p>
                  <span className="symbol">💧</span> {forecast.main.humidity}%
                </p>
                <p>
                  <span className="symbol wind">༄</span> {forecast.wind.speed}
                  {units == "metric"? <>m/s</> : <>mph</>}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="no-result">No Result...</p>
      )}
    </div>
  );
};

export default FetchWeather;
