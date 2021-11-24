// Weather.js - 메인 페이지의 날씨 슬라이드
import React, { useState } from "react";
import styled from "styled-components";
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
import { MdLocationPin } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

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
    let days = ["일", "월", "화", "수", "목", "금", "토"];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();

    return `${year}년 ${month} ${date}일 ${day} `;
  };

  const city = "Seoul";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=3ad1d1f3a704fea952da06944931bbd0`;
  const [weather, setWeather] = useState("");
  const [phrase, setPhrase] = useState("");
  const weatherNumber = (parseInt(weather.id) / 100).toFixed(0);
  // 날씨 가져오기
  React.useEffect(() => {
    axios.get(url).then((responseData) => {
      const data = responseData.data;
      setWeather({
        id: data.weather[0].id,
        currentTemperature: data.main.temp,
        minTemperature: data.main.temp_min,
        maxTemperature: data.main.temp_max,
        main: data.weather[0].main,
        loading: false,
        icon: data.weather[0].icon,
      });

      if (weatherNumber === "0") {
        setPhrase("산책 시키기 좋은 날씨네요!");
      } else if (weatherNumber === "2") {
        setPhrase("비가 많이 오네요!");
      } else if (weatherNumber === "3") {
        setPhrase("우비 입고 산책 어때요?");
      } else if (weatherNumber === "5") {
        setPhrase("비가 많이 오네요");
      } else if (weatherNumber === "6") {
        setPhrase("강아지한테 눈 보여주기 좋은 날!");
      } else if (weatherNumber === "7") {
        setPhrase("안개와 함께 산책!");
      } else {
        setPhrase("구름이 많아서 안 더워요!");
      }
    });
  }, []);

  let currentTemperature = weather.currentTemperature - 273.15;
  let minTemperature = weather.minTemperature - 273.15;
  let maxTemperature = weather.maxTemperature - 273.15;
  //   setCold(c < 15 ? true : false);

  const selectIcon = () => {
    let iconId =
      weather.id === 800 ? 0 : (parseInt(weather.id) / 100).toFixed(0);
    switch (iconId) {
      case "0":
        return <TiWeatherSunny size="80px" color="red" />;
      case "2":
        return <TiWeatherStormy size="80px" color="black" />;
      case "3":
        return <TiWeatherShower size="80px" color="blue" />;
      case "5":
        return <TiWeatherDownpour size="80px" color="white" />;
      case "6":
        return <TiWeatherSnow size="80px" color="white" />;
      case "7":
        return <BsCloudFog size="80px" color="white" />;
      case "8":
        return <TiWeatherCloudy size="80px" color="white" />;
    }
  };

  return (
    <Wrap>
      <Top>
      <Left>
        <LeftTop>
          <MdLocationPin
            style={{ color: "#FF5656", width: "24px", height: "24px" }}
          />
          <City>서울시</City>
        </LeftTop>

        <Temperature>{currentTemperature.toFixed(0)}℃</Temperature>
        <OtherTemp>
          <IoIosArrowDown
            style={{
              color: "#61C5B8",
              width: "24px",
              height: "24px",
              marginTop: "-5px",
            }}
          />
          <MinMaxTemp>{minTemperature.toFixed(0)}℃</MinMaxTemp>

          <IoIosArrowUp
            style={{
              color: "#FF5656",
              width: "24px",
              height: "24px",
              marginTop: "-7px",
            }}
          />
          <MinMaxTemp>{maxTemperature.toFixed(0)}℃</MinMaxTemp>
        </OtherTemp>
      </Left>

      <Right>
        <WeatherIcon>{selectIcon()}</WeatherIcon>
      </Right>
      </Top>
      <Bottom>{phrase}</Bottom>
    </Wrap>
  );
}
export default Weather;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  /* aspect-ratio: 4 / 2; */
  padding: 16px 5% 16px 8%;
  background-color: #86d3ff;
  border-radius: 14px;
  /* position: absolute; */
  /* object-fit:cover; */
  /* border: 1px solid red; */
`;

const Top = styled.div`
/* border: 1px solid orange; */
display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const Temperature = styled.div`
  font-size: 28px;
  line-height: 36px;
  color: #fff;
  margin-left: 8px;
  margin-bottom: 12px;
`;
const OtherTemp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
const MinMaxTemp = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin-right: 8px;
`;

const City = styled.div`
  color: #fff;
  margin-left: 10px;
`;
const LeftTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const DateDiv = styled.div`
  color: #444;
  font-size: 15px;
  font-style: italic;
`;

const Right = styled.div`
  color: white;
`;

const WeatherIcon = styled.div`
`;

const Bottom = styled.div`
font-size: 16px;
padding-top: 4px;
`
