import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { AiOutlineGlobal } from "react-icons/ai";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import debounce from "lodash.debounce";
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleCaret, setToggleCaret] = useState(false);
  const [myindexm, setMyIndex] = useState(0);
  const [openRegion, setOpenRegion] = useState(null); // <- for regions
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const handleMy = (index) => {
    setMyIndex(index);
  };

  const fetchCities = async (search) => {
    if (!search) {
      setCities([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
          search
        )}&format=json`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const debouncedFetchCities = debounce(fetchCities, 500);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchCities(value);
  };

  // 🌍 Region to Cities mapping
  const regionCities = {
    AMERICAS: [
      "Antigua and Barbuda | English",
      "Argentina | Español",
      "Bahamas | English",
      "Barbados | English",
      "Belize | English",
      "Bolivia | Español",
      "Brazil | Português",
      "Canada | English",
      "Canada | Français",
      "Chile | Español",
      "Colombia | Español",
      "Costa Rica | Español",
      "Dominica | English",
      "Dominican Republic | Español",
      "Ecuador | Español",
      "El Salvador | Español",
      "Grenada | English",
      "Guatemala | Español",
      "Guyana | English",
      "Haiti | Français",
      "Honduras | Español",
      "Jamaica | English",
      "Mexico | Español",
      "Nicaragua | Español",
      "Panama | Español",
      "Panama | English",
      "Paraguay | Español",
      "Peru | Español",
      "St. Kitts and Nevis | English",
      "St. Lucia | English",
      "St. Vincent and the Grenadines | English",
      "Suriname | Nederlands",
      "Trinidad and Tobago | English",
      "Uruguay | Español",
      "United States | English",
      "United States | Español",
      "Venezuela | Español",
    ],
    ASIA: [
      "Australia | English",
      "Bangladesh | বাংলা",
      "Brunei | Bahasa Melayu",
      "China | 中文",
      "Hong Kong SAR | 中文",
      "East Timor | Português",
      "Fiji | English",
      "India (English) | English",
      "India (Hindi) | हिन्दी",
      "Indonesia | Bahasa Indonesia",
      "Japan | 日本語",
      "Kiribati | English",
      "South Korea | 한국어",
      "Kyrgyzstan | Русский",
      "Malaysia | Bahasa Melayu",
      "Marshall Islands | English",
      "Micronesia | English",
      "New Zealand | English",
      "Palau | English",
      "Philippines | English",
      "Philippines | Tagalog",
      "Samoa | English",
      "Singapore | English",
      "Singapore | 中文",
      "Solomon Islands | English",
      "Taiwan | 中文",
      "Thailand | ไทย",
      "Tonga | English",
      "Tuvalu | English",
      "Vanuatu | English",
      "Vanuatu | Français",
      "Vietnam | Tiếng Việt",
    ],
    AFRICA: [
      "Algeria | العربية",
      "Algeria | Français",
      "Angola | Português",
      "Benin | Français",
      "Burkina Faso | Français",
      "Burundi | Français",
      "Cameroon | Français",
      "Cameroon | English",
      "Cape Verde | Português",
      "Central African Republic | Français",
      "Chad | Français",
      "Chad | العربية",
      "Comoros | Français",
      "Comoros | العربية",
      "Democratic Republic of the Congo | Français",
      "Republic of Congo | Français",
      "Côte d'Ivoire | Français",
      "Djibouti | Français",
      "Djibouti | العربية",
      "Egypt | العربية",
      "Equatorial Guinea | Español",
      "Eritrea | العربية",
      "Gabon | Français",
      "Gambia | English",
      "Ghana | English",
      "Guinea | Français",
      "Guinea-Bissau | Português",
      "Kenya | English",
      "Lesotho | English",
      "Liberia | English",
      "Libya | العربية",
      "Madagascar | Français",
      "Mali | Français",
      "Mauritania | العربية",
      "Mauritius | English",
      "Mauritius | Français",
      "Morocco | العربية",
      "Morocco | Français",
      "Mozambique | Português",
      "Namibia | English",
      "Niger | Français",
      "Nigeria | English",
      "Rwanda | Français",
      "Rwanda | English",
      "Sao Tome and Principe | Português",
      "Senegal | Français",
      "Sierra Leone | English",
      "Somalia | العربية",
      "South Africa | English",
      "South Sudan | English",
      "Sudan | العربية",
      "Swaziland | English",
      "Tanzania | English",
      "Togo | Français",
      "Tunisia | العربية",
      "Uganda | English",
    ],
    EUROPE: [
      "Andorra | Català",
      "Andorra | Français",
      "Austria | Deutsch",
      "Belarus | Русский",
      "Belgium | Dutch",
      "Belgium | Français",
      "Bosnia and Herzegovina | Hrvatski",
      "Croatia | Hrvatski",
      "Cyprus | Ελληνικά",
      "Czech Republic | Čeština",
      "Denmark | Dansk",
      "Estonia | Русский",
      "Estonia | Eesti",
      "Finland | Suomi",
      "France | Français",
      "Germany | Deutsch",
      "Greece | Ελληνικά",
      "Hungary | Magyar",
      "Ireland | English",
      "Italy | Italiano",
      "Liechtenstein | Deutsch",
      "Luxembourg | Français",
      "Malta | English",
      "Monaco | Français",
      "Netherlands | Nederlands",
      "Norway | Norsk",
      "Poland | Polski",
      "Portugal | Português",
      "Romania | Română",
      "Russia | Русский",
      "San Marino | Italiano",
      "Slovakia | Slovenčina",
      "Spain | Español",
      "Spain | Català",
      "Sweden | Svenska",
      "Switzerland | Deutsch",
      "Turkey | Turkçe",
      "Ukraine | Українська",
      "United Kingdom | English",
      "State of Vatican City (Holy See) | Italiano",
    ],
    MIDDLEEAST: [
      "Bahrain | العربية",
      "Iran | فارسى",
      "Iraq | العربية",
      "Israel | עִבְרִית",
      "Jordan | العربية",
      "Kuwait | العربية",
      "Lebanon | العربية",
      "Oman | العربية",
      "Pakistan | اردو",
      "Pakistan | English",
      "Qatar | العربية",
      "Saudi Arabia | العربية",
      "Syria | العربية",
      "United Arab Emirates | العربية",
    ],
  };

  return (
    <>
      <div className="bg-[#0d142a] p-5 flex justify-between items-center relative">
        <img src={Logo} alt="" className="w-24" />

        <div className="w-[30%]">
          <input
            type="text"
            className="bg-[#293248]  p-4 w-full rounded-md"
            placeholder="Enter City"
            value={query}
            onChange={handleChange}
          />
          <ul className="bg-white  absolute w-[29%] rounded-md mt-2 max-h-60 overflow-y-auto">
            {cities.map((city) => (
              <li
                key={city.place_id}
                className="p-2 text-black hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setQuery(city.display_name);
                  setCities([]);
                }}
              >
                {city.display_name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          {/* Caret and Global */}
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => {
              setToggleCaret(!toggleCaret);
              setToggleMenu(false);
            }}
          >
            <AiOutlineGlobal size={30} />
            <p className="font-medium text-xl">PK</p>
            <p className="text-xl">|</p>
            <p className="font-medium text-xl">°C</p>
            {toggleCaret ? (
              <BsCaretUpFill size={20} className="mt-1" />
            ) : (
              <BsCaretDownFill size={20} className="mt-1" />
            )}
          </div>

          {/* Hamburger menu */}
          <div
            onClick={() => {
              setToggleMenu(!toggleMenu);
              setToggleCaret(false);
            }}
            className="cursor-pointer ml-4 relative w-8 h-8 flex flex-col justify-center items-center"
          >
            <span
              className={`block h-1 w-8 bg-white rounded transition-all duration-300 ${
                toggleMenu ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-8 bg-white rounded transition-all duration-300 my-1 ${
                toggleMenu ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-8 bg-white rounded transition-all duration-300 ${
                toggleMenu ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </div>
      </div>

      {/* Dropdown for hamburger menu */}
      {toggleMenu && (
        <div className="bg-white flex p-5 absolute top-[120px] w-full z-50 shadow-lg">
          <div className="pl-10">
            <h1 className="font-bold text-xl text-[#252422]">Account</h1>
            <h1 className="text-xl text-[#252422]">Manage Account</h1>
            <h1 className="text-xl text-[#252422]">Logout</h1>
          </div>
          <div className="pl-20">
            <h1 className="font-bold text-xl text-[#252422]">Privacy</h1>
            <h1 className="text-xl text-[#252422]">Data Rights</h1>
            <h1 className="text-xl text-[#252422]">Logout</h1>
          </div>
        </div>
      )}

      {toggleCaret && (
        <div className="bg-white absolute top-[120px] w-full z-50 shadow-lg">
          {/* °C / °F / Hybrid */}
          <div className="flex items-center p-4 border-b border-gray-300 gap-5 justify-center">
            {["°C", "°F", "Hybrid"].map((item, index) => (
              <h1
                key={index}
                onClick={() => handleMy(index)}
                className={`text-xl text-center text-[#252422] pb-1 cursor-pointer ${
                  myindexm === index
                    ? "border-b-2 border-red-500"
                    : "border-b-0"
                }`}
              >
                {item}
              </h1>
            ))}
          </div>

          <h6 className="text-[#252422] text-center py-2">
            C / millimetres / km / kmh / millibars
          </h6>

          {Object.keys(regionCities).map((region, index) => (
            <div key={index} className="border-b-2 border-gray-200">
              <div
                className="flex justify-between p-4 cursor-pointer"
                onClick={() =>
                  setOpenRegion(openRegion === index ? null : index)
                }
              >
                <h1 className=" text-xl font-bold text-[#252422]">{region}</h1>
                <h1 className=" text-2xl font-bold text-[#252422]">
                  {openRegion === index ? "-" : "+"}
                </h1>
              </div>

              {openRegion === index && (
                <div className="pl-8 pb-4 flex   flex-wrap overflow-auto">
                  {regionCities[region].map((city, cityIndex) => (
                    <div className="w-1/3">
                      <a
                        key={cityIndex}
                        className="text-[#555] text-xl py-1 cursor-pointer hover:underline hover:text-[#252422]"
                      >
                        {city}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
