import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

function AddRecord() {
  return (
    <div>
      <button>Custom Habit</button>
      <Card
        onClick={() => {
          history.push("/addDetail");
        }}
      >
        가을이랑 산책 한시간
      </Card>
    </div>
  );
}

const Card = styled.div`
  width: 300px;
  height: 100px;
  margin: auto;
  border: 1px solid black;
  cursor: pointer;
`;

export default AddRecord;
