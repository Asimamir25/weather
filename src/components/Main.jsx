import React, { useState } from "react";
import { BiCloud } from "react-icons/bi";
import Cloud from "../assets/wi-day-cloudy-gusts.svg";
import { AiOutlineClose, AiOutlineGlobal } from "react-icons/ai";
import Meter from "../assets/meter.png";
import Rise from "../assets/rise.png";
import Down from "../assets/down.png";

const Main = () => {
  const [key, setKey] = useState(0);
  const [weatherCards, setWeatherCards] = useState([
    {
      city: "Dubai City",
      humidity: "18%",
      wind: "12 km/h",
      uv: "High",
      isComplete: true,
    },
  ]);

  const [newCity, setNewCity] = useState("");

  const handleCitySubmit = (index) => {
    const updatedCards = [...weatherCards];
    // Simulated weather data (in real use case, you'd fetch from an API)
    updatedCards[index] = {
      city: newCity,
      humidity: "20%",
      wind: "10 km/h",
      uv: "Moderate",
      isComplete: true,
    };
    setWeatherCards(updatedCards);
    setNewCity("");
  };
  const addCard = () => {
    setWeatherCards([...weatherCards, { city: "", isComplete: false }]);
  };
  const handleRemoveCard = (index) => {
    const updated = [...weatherCards];
    updated.splice(index, 1);
    setWeatherCards(updated);
  };

  return (
    <>
      <div className="flex bg-[#e8e8e8] border-b border-gray-300 justify-between  px-7">
        {[
          "My Dashboard",
          "Today",
          "Hourly",
          "10 Day",
          "Weekend",
          "Monthly",
          "Radar",
          "More Forcast",
        ].map((item, index) => (
          <p
            className={`font-medium hover:border-b-2 cursor-pointer border-[#252422] p-3 text-[#252422] ${
              key === index ? "border-b-2" : ""
            }`}
            onClick={() => {
              setKey(index);
            }}
          >
            {item}
          </p>
        ))}
      </div>
      {key === 0 && (
        <div className="p-6">
          <div className="flex justify-between">
            <h3 className="text-[#253422] font-bold text-2xl">
              Good afternoon, Asim
            </h3>
            <h3 className="text-[#253422] font-bold text-2xl">
              {weatherCards.length} of 2 locations
            </h3>
          </div>

          <div className="flex gap-5 flex-col md:flex-row">
            {weatherCards.map((card, index) => (
              <div
                key={index}
                className="md:w-[34%] my-4 p-4 bg-white rounded-md shadow-md"
              >
                {card.isComplete ? (
                  <>
                    <p className="text-[#253422] font-bold text-xl">
                      {card.city}
                    </p>
                    <div className="flex items-center gap-2">
                      <img
                        src={Cloud}
                        alt="Weather Icon"
                        className="w-[40px] h-[40px]"
                      />
                      <p className="text-[#253422] font-medium text-xl">
                        {card.city}
                      </p>
                    </div>
                    <p className="text-[#253422] font-medium text-2xl">
                      It's 31° and partly cloudy.
                    </p>
                    <p className="text-[#253422] font-medium">
                      Today's high temperature will be nearly the same as
                      yesterday's.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2 items-center justify-between">
                      <div className="bg-[#e8e8e8] flex flex-col p-2 w-[48%] rounded-md text-center">
                        <p className="text-[#253422] font-medium">Humidity</p>
                        <p className="text-[#253422] font-medium">
                          {card.humidity}
                        </p>
                      </div>
                      <div className="bg-[#e8e8e8] flex flex-col p-2 w-[48%] rounded-md text-center">
                        <p className="text-[#253422] font-medium">Wind</p>
                        <p className="text-[#253422] font-medium">
                          {card.wind}
                        </p>
                      </div>
                      <div className="bg-[#e8e8e8] flex flex-col p-2 w-full rounded-md text-center">
                        <p className="text-[#253422] font-medium">UV Index</p>
                        <p className="text-[#253422] font-medium">{card.uv}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-3 h-full justify-between">
                    <div className="flex justify-between items-center">
                      <p className="text-[#253422] ">Edit</p>
                      <div className=" h-[20px] w-[20px]  flex justify-center items-center rounded-full bg-[#e8e8e8]">
                        <AiOutlineClose
                          color="blue"
                          onClick={() => {
                            handleRemoveCard(index);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {" "}
                      <input
                        type="text"
                        className="border-b  border-black  outline-none text-black"
                        value={newCity}
                        placeholder="Enter Name"
                        onChange={(e) => setNewCity(e.target.value)}
                      />
                      <input
                        type="text"
                        className="border-b border-black outline-none text-black"
                        value={newCity}
                        placeholder="Enter City"
                        onChange={(e) => setNewCity(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleCitySubmit(index)}
                        className="bg-[#253422] text-white p-2 rounded-md"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {weatherCards.length < 2 && (
              <div className="md:w-[34%] my-4  bg-white rounded-md shadow-md flex justify-center items-center">
                <div
                  className="flex flex-col items-center justify-center"
                  onClick={addCard}
                >
                  <p className="text-[#253422]">+</p>
                  <p className=" text-black px-4 py-2  text-xl  font-bold rounded-md h-fit">
                    Add Location
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {key == 1 && (
        <div className="pl-[60px] p-4">
          <div className="shadow-md bg-white rounded-md pb-3 max-w-[70%]">
            <div className="bg-[#174858] rounded-t-md p-2 flex justify-between">
              <h5 className="text-white text-2xl">Dubai City, Erbil</h5>
              <h5 className="text-white text-2xl">As of 10:33 GMT+03:00</h5>
            </div>
            <div className="p-3 ">
              <div className="flex">
                <h1 className="text-black text-5xl ">32°</h1>
                <img src={Cloud} alt="" className="w-20" />
              </div>
              <h1 className="text-black text-3xl ">Fair</h1>
              <h1 className="text-black text-3xl ">Day 36° • Night 20°</h1>
            </div>
          </div>

          <div className="shadow-md bg-white rounded-md p-5 max-w-[70%] mt-5">
            <h1 className="text-black text-2xl font-semibold mb-4">
              Weather Today in Dubai City, Erbil
            </h1>

            <div className="flex justify-between items-center">
              {/* Temperature Info */}
              <div>
                <p className="text-black text-lg">Feels Like</p>
                <h3 className="text-black text-4xl font-bold">32°</h3>
              </div>

              {/* Meter + Sunrise/Sunset Info */}
              <div className="flex flex-col items-center gap-3">
                <img src={Meter} alt="Meter" className="w-20" />

                <div className="flex gap-6">
                  {/* Sunrise */}
                  <div className="flex items-center gap-2">
                    <img src={Rise} alt="Sunrise" className="w-8 h-8" />
                    <p className="text-black text-sm">4:30 AM</p>
                  </div>

                  {/* Sunset */}
                  <div className="flex items-center gap-2">
                    <img
                      src={Rise}
                      alt="Sunset"
                      className="w-8 h-8 rotate-180"
                    />
                    <p className="text-black text-sm">6:45 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
      {key == 2 && (
        <div>
          <h3 className="text-[#253422]">HOurly</h3>
        </div>
      )}{" "}
      {key == 3 && (
        <div>
          <h3 className="text-[#253422]">10day</h3>
        </div>
      )}
      {key == 4 && (
        <div>
          <h3 className="text-[#253422]">Weekend</h3>
        </div>
      )}
      {key == 5 && (
        <div>
          <h3 className="text-[#253422]">Monthly</h3>
        </div>
      )}
      {key == 6 && (
        <div>
          <h3 className="text-[#253422]">Radar</h3>
        </div>
      )}
      {key == 7 && (
        <div>
          <h3 className="text-[#253422]">More</h3>
        </div>
      )}
    </>
  );
};

export default Main;
