import React, { useState } from "react";
import axios from "axios";
import { FaSyncAlt } from "react-icons/fa";
import { GoSync } from "react-icons/go";
function App() {
  const [data, setData] = useState({});
  const [toggle, setToggle] = useState(true);
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=8880178c4c63e1d0b41d95d921d53997`;

  const searchLocation = () => {
    // console.log(event);
    // return;
    // if (event?.key === "Enter") {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setLocation("");
    // }
  };

  function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }
  return (
    <div className="app">
      <div className="flex flex-col items-center justify-center w-full max-w-screen-md mx-auto min-h-screen ">
        <div className="flex gap-8 items-center justify-center w-full px-2 flex-wrap mx-auto py-8 ">
          <input
            className="block p-3 max-w-[314px]  w-full rounded-full border-0 border-white p text-white shadow-sm ring-1 ring-inset text-xl ring-white placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 bg-transparent"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            // onKeyPress={searchLocation}
            placeholder="Enter Location"
            type="text"
          />
          <button
            type="submit"
            className="flex w-full max-w-[314px] justify-center rounded-full bg-indigo-600 px-3 py-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => searchLocation()}
          >
            Check Weather
          </button>
        </div>
        { data.main? <div className="flex items-center sm:justify-between flex-col sm:flex-row bg-zinc-900/20 w-full mx-4  md:mx-auto">
          <div className="p-4 w-full relative">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="relative">
              {toggle ? (
                <div className="">
                  {data.main ? (
                    <>
                      <h1 className="font-bold text-[50px]">
                        {Math.ceil(
                          fahrenheitToCelsius(data.main.temp.toFixed())
                        )}
                        °C
                      </h1>
                    </>
                  ) : (
                    <GoSync className="animate-spin" />
                  )}
                </div>
              ) : (
                <div>
                  {data.main ? (
                    <h1 className="font-bold text-[50px]">
                      {data.main.temp.toFixed()}°F
                    </h1>
                  ) : (
                    <GoSync className="animate-spin" />
                  )}
                </div>
              )}
              <p className="text-[14px]">Feels Like</p>
            </div>

            <div className="font-bold text-[20px]">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
            <button
              className="absolute top-10 right-10"
              onClick={() => setToggle(!toggle)}
            >
              <FaSyncAlt
                className={`${toggle ? "text-indigo-200" : "text-white"}`}
              />
            </button>
          </div>

          {data.name !== undefined && (
            <div className="w-full sm:justify-end flex flex-col p-4 sm:items-end">
              <div className="flex flex-col sm:items-end">
                {data.main ? (
                  <p className="font-bold text-[30px]">{data.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="flex flex-col sm:items-end">
                {data.wind ? (
                  <p className="font-bold text-[20px]">
                    {data.wind.speed.toFixed()} MPH
                  </p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div> : <div >Enter the name of your city to get your current weather.</div>}
      </div>
    </div>
  );
}

export default App;
