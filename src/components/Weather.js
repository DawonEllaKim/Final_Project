import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import {
  TiWeatherSunny,
  TiWeatherStormy,
  TiWeatherShower,
  TiWeatherDownpour,
  TiWeatherSnow,
  TiWeatherCloudy,
} from "react-icons/ti";
import { BsCloudFog } from "react-icons/bs";

const api = {
  key: "a422f44283aac58f0d215db5d78a2834",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather({ setCold }) {
  // 날짜 가져오기
  const dateBuilder = (d) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    // sunday 먼저..!!
    let days = ["Sun", "Mon", "Tue", "Wed", "Tur", "Fri", "Sat"];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();

    return `${day} ${date} ${month} ${year}`;
  };

  const city = "Seoul";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=3ad1d1f3a704fea952da06944931bbd0`;
  const [weather, setWeather] = useState("");

  // 날씨 가져오기
  axios.get(url).then((responseData) => {
    const data = responseData.data;
    setWeather({
        id: data.weather[0].id,
        temperature: data.main.temp,
        main: data.weather[0].main,
        loading: false,
      });
     console.log(data)
  });
  
  let c = weather.temperature - 273.15;
//   setCold(c < 15 ? true : false);

  const selectIcon = () => {
    let iconId =
      weather.id === 800 ? 0 : (parseInt(weather.id) / 100).toFixed(0);
    switch (iconId) {
      case "0":
        return <TiWeatherSunny size="6rem" color="red" />;
      case "2":
        return <TiWeatherStormy size="6rem" color="black" />;
      case "3":
        return <TiWeatherShower size="6rem" color="blue" />;
      case "5":
        return <TiWeatherDownpour size="6rem" color="navy" />;
      case "6":
        return <TiWeatherSnow size="6rem" color="white" />;
      case "7":
        return <BsCloudFog size="6rem" color="white" />;
      case "8":
        return <TiWeatherCloudy size="6rem" color="white" />;
    }
  };
  return (
    <Wrapper>
      <div className="locationBox">
        <Location>Seoul City, KOREA</Location>
        <DateDiv>-- {dateBuilder(new Date())} -- </DateDiv>
      </div>

      <div className="weatherBox">
        <Temperature>{c.toFixed(2)}℃</Temperature>
        <WeatherDiv>{weather.main}</WeatherDiv>
        {selectIcon()}
      </div>
    </Wrapper>
  );
}
export default Weather;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: burlywood;
  
`;
const Location = styled.div`
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 1rem;
  font-size: 30px;
  font-weight: 500;
  text-shadow: 2px 2px rgba(30, 50, 50, 0.5);
`;

const DateDiv = styled.div`
  color: white;
  font-size: 15px;
  font-style: italic;
`;

const Temperature = styled.div`
  color: white;
  font-size: 50px;
  margin-top: 1rem;
`;

const WeatherDiv = styled.div`
  color: white;
  font-size: 20px;
  margin-top: 2rem;
`;

const WeatherIcon = styled.div``;
