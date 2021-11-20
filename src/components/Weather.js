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
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
    // sunday 먼저..!!
    let days = ["알", "월", "화", "수", "목", "금", "토"];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();

    return `${year}년 ${month} ${date}일 ${day} `;
  };

  const city = "Seoul";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=3ad1d1f3a704fea952da06944931bbd0`;
  const [weather, setWeather] = useState("");

  // 날씨 가져오기
  React.useEffect(() => {
    axios.get(url).then((responseData) => {
      const data = responseData.data;
      setWeather({
        id: data.weather[0].id,
        temperature: data.main.temp,
        main: data.weather[0].main,
        loading: false,
      });
      //  console.log(data)
    });
  }, []);

  let c = weather.temperature - 273.15;
  //   setCold(c < 15 ? true : false);

  const selectIcon = () => {
    let iconId =
      weather.id === 800 ? 0 : (parseInt(weather.id) / 100).toFixed(0);
    switch (iconId) {
      case "0":
        return <TiWeatherSunny size="50" color="red" />;
      case "2":
        return <TiWeatherStormy size="50" color="black" />;
      case "3":
        return <TiWeatherShower size="50" color="blue" />;
      case "5":
        return <TiWeatherDownpour size="50" color="navy" />;
      case "6":
        return <TiWeatherSnow size="50" color="white" />;
      case "7":
        return <BsCloudFog size="50" color="white" />;
      case "8":
        return <TiWeatherCloudy size="50" color="white" />;
    }
  };
  return (
    <Wrapper>
      <Temperature>{c.toFixed(0)}℃</Temperature>
      <InfoWrapper>
        <Location>서울시</Location>
        <DateDiv> {dateBuilder(new Date())} </DateDiv>

        <WeatherDiv>
          {weather.main}
          <WeatherIcon>{selectIcon()}</WeatherIcon>
        </WeatherDiv>
      </InfoWrapper>
    </Wrapper>
  );
}
export default Weather;

const Wrapper = styled.div`
  width: 350px;
  height: 172px;
  display: flex;

  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  background-color: #86d3ff;
  text-align: center;
  border-radius: 15px;
  box-sizing: border-box;
`;

const Temperature = styled.div`
  color: white;
  font-size: 44px;
  padding: 0 16px 0 24px;
`;

const InfoWrapper = styled.div`
  box-sizing: border-box;
  text-align: left;
`;
const Location = styled.div`
  color: #444;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const DateDiv = styled.div`
  color: #444;
  font-size: 15px;
  font-style: italic;
`;

const WeatherDiv = styled.div`
  color: white;
  font-size: 20px;
  text-align: center;
  display: flex;
  align-items: center;
`;

const WeatherIcon = styled.div`
  font-size: 16px;
  margin: 4px 0 0 16px;
`;
