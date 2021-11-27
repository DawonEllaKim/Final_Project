import React from "react";
import styled from "styled-components";
import Event from "../image/Event.png";

function EventCard() {
  const feedBack = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLScMsuyFnjIBvpUhGdVY6QBfGMiMRecj9soXN61oa4VFzhHVSA/viewform?usp=sf_link"
    );
  };

  return (
    <Wrap onClick={feedBack}>
      <img src={Event} onClick={feedBack} />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 159px;
  background-size: cover;
  img {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
`;
export default EventCard;
