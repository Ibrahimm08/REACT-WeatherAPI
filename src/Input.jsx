import { useContext, useRef, useEffect } from "react";
import "./Input.css";
import { WeatherContext } from "./WeatherContext";

const Input = ({ type, text, value, onchange, onclick }) => {
  const {
    city,
    setCity,
    history,
    setHistory,
    setFilterSuggest,
    filterSuggest,
  } = useContext(WeatherContext);

  const ref = useRef(null); // Using this to check if the search bar is clicked of to close suggetions

  useEffect(() => {
    const tempStore = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(tempStore);
  }, []);

  useEffect(() => {
    if (city.trim()) {
      const filtered = history.filter((item) =>
        item.toLowerCase().includes(city.toLowerCase())
      );
      setFilterSuggest(filtered);
    } else {
      setFilterSuggest([]);
    }
  }, [city, history]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setFilterSuggest([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div>
      <input
        type={type}
        placeholder={text}
        value={value}
        onChange={onchange}
        onClick={onclick}
      />
      {type == "text" ? (
        <>
          {filterSuggest.length > 0 && (
            <div ref={ref} className="filterSuggest">
              {filterSuggest.map((item, key) => (
                <div
                  key={key}
                  onClick={() => {
                    setCity(item);
                    setFilterSuggest([]);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;
