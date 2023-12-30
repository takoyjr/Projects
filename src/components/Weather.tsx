import { useState, useEffect } from "react";
import { useDate } from "../hooks/useDate";
import img404 from "../images/404.png";
import imgClear from "../images/clear.png";
import imgCloud from "../images/cloud.png";
import imgMist from "../images/mist.png";
import imgRain from "../images/rain.png";
import imgSnow from "../images/snow.png";

import {
  FaSun,
  FaCloud,
  FaSmog,
  FaCloudRain,
  FaSnowflake,
  FaRainbow,
} from "react-icons/fa";

type FlexDirection = "row" | "column";

export function Weather() {
  const date = useDate().currentDate.toLocaleDateString("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const [width, setWidth] = useState<number | null>(null);
  const [flex, setFlex] = useState<FlexDirection>("row");
  const [wFull, setwFull] = useState("50%");
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Вызываем handleResize при монтировании компонента
    handleResize();

    // Добавляем обработчик события изменения размера окна
    window.addEventListener("resize", handleResize);

    // Убираем обработчик события при демонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let flex: "row" | "column" = "row";
    let wF: "100%" | "50%" = "100%";
    if (width && width <= 768) {
      flex = "column";
      wF = "100%";
    }

    setwFull(wF);
    setFlex(flex);
  }, [width]);

  const [locationInp, setLocationInp] = useState("");

  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [tempFeels, setTempFeels] = useState("");
  const [weather, setWeather] = useState<React.ReactNode>("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [tempMin, setTemperatureMin] = useState("");
  const [tempMax, setTemperatureMax] = useState("");

  const [bg, setBg] = useState("");

  const APIKey = "e7c558e6ef9cedf110a1cbfba687221d";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${locationInp}&appid=${APIKey}`;

  var xhr = new XMLHttpRequest();

  const searchLocation = () => {
    xhr.open("GET", URL);
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        var jsonData = JSON.parse(xhr.response);
        setLocation(locationInp);
        setLocationInp("");
        setTemperature(
          `${Math.round(parseFloat(jsonData.main.temp) - 273.15)}°C`
        );
        setTempFeels(
          `${Math.round(parseFloat(jsonData.main.feels_like) - 273.15)}°C`
        );
        setWeather(jsonData.weather[0].main);
        setWind(`${Math.round(parseFloat(jsonData.wind.speed) * 1.609)}Km/h`);
        setHumidity(`${jsonData.main.humidity}%`);
        setTemperatureMin(
          `${Math.round(parseFloat(jsonData.main.temp_min) - 273.15)}°C`
        );
        setTemperatureMax(
          `${Math.round(parseFloat(jsonData.main.temp_max) - 273.15)}°C`
        );
        switch (jsonData.weather[0].main) {
          case "Clear":
            setBg(imgClear);
            setWeather(<FaSun />);
            break;
          case "Clouds":
            setBg(imgCloud);
            setWeather(<FaCloud />);
            break;
          case "Mist":
            setBg(imgMist);
            setWeather(<FaSmog />);
            break;
          case "Rain":
            setBg(imgRain);
            setWeather(<FaCloudRain />);
            break;
          case "Snow":
            setBg(imgSnow);
            setWeather(<FaSnowflake />);
            break;
          default:
            setBg(img404);
            setWeather(<FaRainbow />);
            break;
        }
      } else {
        console.error("Request failed with status:", xhr.status);
        setBg(img404);
      }
    };
    xhr.send();
  };

  return (
    <div
      className="flex flex-row bg-contain bg-no-repeat bg-center h-screen"
      style={{ backgroundImage: `url(${bg})`, flexDirection: `${flex}` }}
    >
      {/* left side */}
      <div
        className="flex flex-col w-1/2 bg-opacity-50 bg-slate-500 h-full justify-center px-10 py-10 text-F5F5DC"
        style={{ width: `${wFull}` }}
      >
        <div className="flex flex-col">
          {location !== "" ? (
            <div className="flex flex-row items-center text-xl mt-4">
              <i className="fa-solid fa-location-dot mr-2 text-yellow-200"></i>
              <h1 className="text-2xl ff-Medium">{location}</h1>
            </div>
          ) : null}
          <div className="flex flex-row items-center my-6">
            <h1 className="ff-Bold text-5xl">{temperature}</h1>
            <h2 className="ml-10 ff-Medium text-3xl text-white"> {weather} </h2>
          </div>
          <div className="flex">
            <h1 className="text-2xl ff-Medium text-white">{date}</h1>
          </div>
        </div>
      </div>
      {/* right side */}
      <div
        className="flex flex-col w-1/2 bg-opacity-75 bg-slate-500 h-full items-center px-10 py-10"
        style={{ width: `${wFull}` }}
      >
        <div className="h-1/3 w-full">
          <div className="flex flex-row justify-center items-center w-full">
            <label className="flex justify-between items-center bg-gray-400 h-10 border-white rounded-3xl px-4 w-full">
              <input
                className="bg-gray-400 text-F5F5DC rounded-3xl h-8 p-3 placeholder:text-white text-xl"
                type="text"
                placeholder="Enter location"
                value={locationInp}
                onChange={(e) => setLocationInp(e.target.value)}
              />
              <i
                className="fa fa-search text-white text-2xl ml-1"
                onClick={searchLocation}
              ></i>
            </label>
          </div>
          {location !== "" ? (
            <div className="flex flex-row justify-around w-full my-6 text-F5F5DC">
              <div className="flex flex-row items-center w-1/2 border rounded-l-lg bg-gray-400 border-none justify-center">
                <i className="fas fa-temperature-low text-3xl"></i>
                <div className="flex-flex-col ml-4">
                  <h1 className="ff-Medium text-2xl "> Min </h1>
                  <h2 className="ff-Bold text-3xl"> {tempMin} </h2>
                </div>
              </div>
              <div className="flex flex-row items-center w-1/2 border rounded-r-lg bg-gray-400 border-none justify-center">
                <i className="fas fa-temperature-high text-3xl"></i>
                <div className="flex-flex-col ml-4">
                  <h1 className="ff-Medium text-2xl "> Max </h1>
                  <h2 className="ff-Bold text-3xl"> {tempMax} </h2>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="h-1/2 w-full">
          {location !== "" ? (
            <div className="flex flex-col w-full text-F5F5DC mt-6">
              <div className="flex flex-row items-center p-4 bg-gray-400 border-none rounded-t-lg justify-around">
                <i className="fa-solid fa-wind text-3xl"></i>
                <div className="flex flex-col w-1/2">
                  <h1 className="ff-Regular"> Wind Speed</h1>
                  <h2 className="text-3xl ff-Medium"> {wind}</h2>
                </div>
              </div>
              <div className="flex flex-row items-center p-4 bg-gray-400 border-y justify-around">
                <i className="fas fa-water text-3xl"></i>
                <div className="flex flex-col w-1/2">
                  <h1 className="ff-Regular"> Humidity</h1>
                  <h2 className="text-3xl ff-Medium"> {humidity}</h2>
                </div>
              </div>
              <div className="flex flex-row items-center p-4 bg-gray-400 border-none rounded-b-lg justify-around ">
                <i className="fas fa-temperature-high text-3xl"></i>
                <div className="flex flex-col w-1/2">
                  <h1 className="ff-Regular"> Feels like</h1>
                  <h2 className="text-3xl ff-Medium"> {tempFeels}</h2>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
