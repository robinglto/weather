import React, { useState, useEffect } from "react";
import Values from "./Values";
import { useDebounce } from "use-debounce";
import cloudy from "../public/cloudy.png";
import rainy from "../public/rainy.png";
import sunny from "../public/sunny.png";
import Image from "next/image";

interface WeatherData {
  main?: { temp: any; temp_min: any; temp_max: any; humidity: string };
  wind?: { speed: string };
  sys?: { country: string; sunrise: any; sunset: any };
  coord?: { lon: string; lat: string };
  name?: string;
  weather?: [{ main: string }];
}

const Data: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [value] = useDebounce(city, 1000);
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [error, setError] = useState<Error | null>(null);

  const temperatura = weatherData.main?.temp - 273.15;
  const temperaturaMax = weatherData.main?.temp_max - 273.15;
  const temperaturaMin = weatherData.main?.temp_min - 273.15;

  let weatherDescription = "";
  switch (weatherData.weather?.[0].main) {
    case "Clear":
      weatherDescription = "Sunny";
      break;
    case "Clouds":
      weatherDescription = "Cloudy";
      break;
    case "Rain":
      weatherDescription = "Rainy";
      break;
    default:
      weatherDescription = "...";
  }

  const sunrise = new Date(weatherData.sys?.sunrise * 1000);
  const sunset = new Date(weatherData.sys?.sunset * 1000);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const currentMonth = monthNames[date.getMonth()];
  const currentDay = dayNames[date.getDay()];
  const currentHour = date.getHours();
  const currentMinute = date.getMinutes();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}
      `
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [city]);

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className={`flex lg:justify-around justify-center mx-16 mt-16 `}>
      <div className="text-black w-3/3 -mx-10  md:mx-10 sm:w-2/3 lg:w-1/3">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex space-x-2 bg-slate-100 px-4 py-6  rounded-lg">
            <button
              className=" bg-inherent text-black font-medium text-xs leading-tight uppercasefocus:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="button"
              id="button-addon2"
            >
              {" "}
              <img
                className="w-5 h-5 mt-1"
                src="https://img.icons8.com/ios-filled/50/1A1A1A/marker.png"
              />
            </button>
            <input
              className="bg-inherit	 outline-none border-b-2 border-black w-full "
              type="text"
              placeholder="Search location by city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </form>
        <div className={`w-3/3 ${value ? "block" : "hidden"}`}>
          <div className="mt-12  bg-slate-100 py-12  rounded-xl px-12">
            <div>
              <h3 className="text-md subpixel-antialiased font-semibold">
                {weatherData.name ? weatherData.name : "City"},{"  "}
                {weatherData.sys?.country} Weather
              </h3>
              <p className="text-xs">
                {date.getDate()} {currentDay.toLowerCase()} of {currentMonth}
              </p>
              <span className="text-4xl">
                {temperatura ? temperatura.toFixed(1) : " "}°
              </span>
            </div>
            <div className="mt-10">
              <p className="text-md subpixel-antialiased font-semibold">
                {weatherDescription}
              </p>
              <p className="text-xs">
                Weather today in {weatherData.name ? weatherData.name : "City"},{" "}
                {weatherData.sys?.country ? weatherData.sys.country : "Country"}
              </p>
            </div>
            <div className="mt-10">
              <div className="space-y-3">
                <Values
                  texto="Speed"
                  valor={weatherData.wind?.speed}
                  img="https://img.icons8.com/ios-glyphs/30/1A1A1A/wind--v1.png"
                />

                <Values
                  texto="Humidity"
                  valor={`${
                    weatherData.main?.humidity
                      ? `${weatherData.main?.humidity}%`
                      : "......"
                  }`}
                  img="https://img.icons8.com/ios-glyphs/30/1A1A1A/wet.png"
                />

                <Values
                  texto="Longitude"
                  valor={weatherData.coord?.lon}
                  img="https://img.icons8.com/ios/50/1A1A1A/longitude.png"
                />

                <Values
                  texto="Latitude"
                  valor={weatherData.coord?.lat}
                  img="https://img.icons8.com/ios/50/1A1A1A/latitude.png"
                />

                <Values
                  texto="Sunrise"
                  valor={`${sunrise.getHours() ? sunrise.getHours() : "..."}${
                    sunrise.getHours() ? ":" : ""
                  }${sunrise.getMinutes() ? sunrise.getMinutes() : "..."}`}
                  img="https://img.icons8.com/ios-glyphs/30/1A1A1A/sun--v1.png"
                />
                <Values
                  texto="Sunset"
                  valor={`${sunset.getHours() ? sunset.getHours() : "..."}${
                    sunset.getHours() ? ":" : ""
                  }${sunset.getMinutes() ? sunset.getMinutes() : "..."}`}
                  img="https://img.icons8.com/external-kosonicon-solid-kosonicon/48/1A1A1A/external-sunset-weather-kosonicon-solid-kosonicon.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`mt-32 ${value ? "block" : "hidden"}`}>
        <div className="lg:block hidden space-y-12">
          <div className="flex justify-center">
            <Image
              className="w-72 h-72"
              src={
                weatherDescription === "Sunny"
                  ? sunny
                  : weatherDescription === "Rainy"
                  ? rainy
                  : cloudy
              }
              alt="Description"
            />
          </div>
          <div className="text-black subpixel-antialiased text-lg ">
            <p className="font-semibold">
              Today/s Forecast for {weatherData.name ? weatherData.name : "..."}
              , {weatherData.sys?.country ? weatherData.sys.country : "..."}
            </p>
            <div className="mt-2 ">
              <div className="flex justify-around space-x-4">
                <div>
                  <p className="font-semibold">Max</p>
                  <p>{temperaturaMax.toFixed(1)}</p>
                </div>
                <div>
                  <p className="font-semibold">Min</p>
                  <p>{temperaturaMin.toFixed(1)}</p>
                </div>
                <div>
                  <p className="font-semibold">Last updated</p>
                  <p>Today at {`${currentHour}:${currentMinute}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
