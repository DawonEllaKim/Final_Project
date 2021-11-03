import React from "react";
import styled from "styled-components";

import { AiOutlineHome } from "react-icons/ai";
import { BsChatRightDots } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";

import { history } from "../redux/configureStore";

const NavBar = (props) => {
  return (
    <>
      <Footer>
        <FooterLeft>
          <Button onClick={() => history.push("/")}>
            <AiOutlineHome style={{ width: "20px", height: "20px" }} />
          </Button>
          <Button>
            <BsChatRightDots style={{ width: "20px", height: "20px" }} />
          </Button>
          <Button onClick={() => history.push("/mypage")}>
            <BsPerson style={{ width: "20px", height: "20px" }} />
          </Button>
        </FooterLeft>

        <FooterRight>
          <Button onClick={() => history.push("/map2")}>
            <MdLocationOn style={{ width: "30px", height: "50px" }} />
          </Button>
        </FooterRight>
      </Footer>
    </>
  );
};

const Footer = styled.div`
  box-sizing: border-box;
  width: 390px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 1%;
  padding: 20px;
  z-index: 10;
`;
const FooterLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 270px;
  height: 60px;
  padding: 20px;
  border-radius: 20px;

  width: 274px;
  height: 60px;

  background-color: #5c5c5c;
  border-radius: 20px;
`;
const FooterRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #5c5c5c;
  border-radius: 50%;
`;
const Button = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;

export default NavBar;
