import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Calendar = () => {
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;

  // 그 달의 첫 주와 마지막 주
  const firstWeek = today.clone().startOf("month").week();
  const lastWeek =
    // moment에서는 53번째주를 1월의 1번째 주로 나타내기때문에 예외를 주어야함
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  const previousMonth = () => {
    setMoment(getMoment.clone().subtract(1, "month"));
  };
  const nextMonth = () => {
    setMoment(getMoment.clone().add(1, "month"));
  };
  const calendarArr = () => {
    let result = [];
    let week = firstWeek;
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let days = today
                .clone()
                //set to 1/1 of this year
                .startOf("year")
                .week(week)
                // set to the first day of this week
                .startOf("week")
                .add(index, "day");

              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                return (
                  <td
                    key={index}
                    style={{
                      backgroundColor: "red",
                      borderRadius: "50%",
                      color: "white",
                    }}
                  >
                    <span>{days.format("D")}</span>
                  </td>
                );
              } else if (days.format("MM") !== today.format("MM")) {
                return (
                  <td key={index} style={{ color: "gray" }}>
                    <span>{days.format("D")}</span>
                  </td>
                );
              } else {
                <td key={index}>
                  <span>{days.format("D")}</span>
                </td>;
              }

              return (
                <td key={index}>
                  <span>{days.format("D")}</span>
                </td>
              );
            })}
        </tr>
      );
    }
    return result;
  };

  return (
    <Wrap>
      <CalendarWrap>
        {/* 스와이프 에니메이션 넣어야함 */}
        <button
          onClick={() => {
            history.push("/addRecord");
          }}
        >
          강아지 기록 추가 버튼
        </button>

        {/* 현재 월 + 이전 월 + 다음 월 */}
        <Head>
          <span>{today.format("MMM YYYY")}</span>
          <div>
            <button onClick={previousMonth}> 이전 달 </button>
            <button onClick={nextMonth}>다음 달 </button>
          </div>
        </Head>

        {/* 요일 + 날짜 */}
        <Body>
          {/* 요일 */}
          <thead>
            <tr>
              <th scope="col">SUN</th>
              <th scope="col">MON</th>
              <th scope="col">TUE</th>
              <th scope="col">WED</th>
              <th scope="col">THU</th>
              <th scope="col">FRI</th>
              <th scope="col">SAT</th>
            </tr>
          </thead>
          {/* 날짜 */}
          <TableBody>{calendarArr()}</TableBody>
        </Body>
      </CalendarWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 390px;
  /* background-color: pink; */
`;
const CalendarWrap = styled.div`
  width: 350px;
  padding: 18px 16px;
  margin: auto;
`;
const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  color: red;
  span {
    font-size: 20px;
  }
  button {
  }
`;
const Body = styled.div`
  margin: auto;
  thead {
    width: 318px;
    height: 18px;
    margin: auto;
    font-size: 13px;
    color: #3c3c43;
    opacity: 30%;
  }
`;
const TableBody = styled.div`
  width: 318px;
  height: 244px;
  margin: auto;
  color: red;
  font-size: 20px;
  td {
    width: 32px;
    height: 50px;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15.67px;
    /* border: 1px solid black; */
    /* width: 100px;
    height: 100px; */
  }
`;

export default Calendar;
