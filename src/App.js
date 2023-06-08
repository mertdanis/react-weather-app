import { useEffect, useState } from "react";
import style from "./style/style.css";

function App() {
  const [city, setcity] = useState("Istanbul");
  const [error, setError] = useState(null);
  const [icon, setIcon] = useState("");
  const [type, setType] = useState("metric");
  const [value, setValue] = useState({
    cityName: "",
    cityTemp: "",
    cityWeather: "",
    cityDesc: "",
  });

  const getValue = (e) => {
    const value = e.target.value;
    setcity(value);
  };

  let buttonType = document.querySelectorAll(".container-type-item");

  buttonType.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttonType.forEach((val) => {
        val.classList.remove("active");
      });

      btn.classList.add("active");
    });
  });

  useEffect(() => {
    const url = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=67f6ba8c5aeb729391819054f65e6bd6&units=${type}`
    )
      .then((value) => {
        if (!value.ok) {
          throw Error("hata");
        }
        return value.json();
      })
      .then((data) =>
        setValue(
          {
            cityName: data.name,
            country: data.sys.country,
            cityTemp: data.main.temp,
            cityWeather: data.weather[0].description,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            humidity: data.main.humidity,
            cityIcon: setIcon(
              `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            ),
          },

          setError(null)
        )
      )
      .catch((err) => {
        setError(err.message);
      });
  }, [city, type]);

  return (
    <div className="App">
      <div className="background-container">
        <img className="background-container-img" src="/static/imgs/bg-1.jpg" />
        <img className="background-container-img" src="/static/imgs/bg-3.jpg" />
        <img className="background-container-img" src="/static/imgs/bg-4.jpg" />
        <img className="background-container-img" src="/static/imgs/bg-6.jpg" />
      </div>

      <div className="container">
        <div className="container-top">
          <div>
            <input
              type="text"
              className="container-input"
              onChange={getValue}
              placeholder="Istanbul ... "
            />
          </div>
          <div className="container-flex">
            <div className="container-city">{value.cityName},</div>
            <div className="container-country">{value.country}</div>
          </div>
        </div>

        <div className="container-flex">
          <div className="container-temp">
            {value.cityTemp} ° {type == "metric" ? "C" : "F"}
          </div>
          <img className="container-temp-img" src={icon} />
        </div>
        <div className="container-weather">{value.cityWeather}</div>
        <div className="container-description"></div>
        <h3 className="container-details-title">Details</h3>
        <div className="container-details">
          <div className="container-details-wind">
            Wind: {value.wind} {type == "metric" ? "km/h" : "mi/h"}
          </div>
          <div className="container-details-visibility">
            Pressure: {value.pressure} mbar
          </div>
          <div className="container-details-humidity">
            Humidity: {value.humidity}%
          </div>
        </div>
        <div className="container-type">
          <button
            onClick={() => setType("metric")}
            className="container-type container-type-item container-type-c active"
          >
            Celcius
          </button>
          <button
            onClick={() => setType("imperial")}
            className="container-type container-type-item container-type-f"
          >
            Fahrenheit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
