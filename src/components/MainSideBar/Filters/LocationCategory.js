import React, { useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { MdLocationOn } from "react-icons/md";

import "../../../nav.css";

const LocationCategory = () => {
  const [subMenu, setSubMenu] = useState(false);

  // 도시 필터
  const [cityActive, setCityActive] = useState(false);
  const [citySelected, setCitySelected] = useState("도시");
  const cityOptions = ["전체", "서울", "인천", "대구", "부산"];

  // 상세 위치 필터
  const [detailLocationActive, setDetailLocationActive] = useState(false);
  const [detailLocationSelected, setDetailLocationSelected] =
    useState("상세위치");
  const detailLocationOptions = [
    // "전체",
    "반포",
    "여의도",
    "뚝섬",
    "서울숲",
    "올림픽공원",
    "인천대공원",
    "대구 수성못",
    "부산 시민공원",
    "부산 광안리",
  ];

  const showSubMenu = () => {
    setSubMenu(!subMenu);
  };

  return (
    <div>
      <Navbar>
        <NavItem icon="위치">
          <DropdownMenuThree />
        </NavItem>
      </Navbar>
    </div>
  );
};

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenuThree() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [open, setOpen] = useState(false);
  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="dropdown">
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
      >
        <div className="menu">
          <DropdownItem goToMenu="top">서울</DropdownItem>
          <DropdownItem goToMenu="bottom">부산</DropdownItem>
          <DropdownItem goToMenu="accessory">악세서리</DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "top"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem goToMenu="main"></DropdownItem>
          <DropdownItem>아우터</DropdownItem>
          <DropdownItem>반팔</DropdownItem>
          <DropdownItem>긴팔</DropdownItem>
          <DropdownItem>셔츠</DropdownItem>
          <DropdownItem>원피스</DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "bottom"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem goToMenu="main"></DropdownItem>
          <DropdownItem>팬츠</DropdownItem>
          <DropdownItem>스커트</DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "accessory"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem goToMenu="main"></DropdownItem>
          <DropdownItem>가방</DropdownItem>
          <DropdownItem>신발</DropdownItem>
          <DropdownItem>모자</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

const Wrap = styled.div`
  margin-bottom: 10px;
  background-color: white;
  height: 100%;
`;
const SideBarLink = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 116px;
  &:hover {
    box-sizing: border-box;
    border-left: 10px solid pink;
    cursor: pointer;
    transition: 350ms;
  }
`;
const SideBarLabel = styled.span`
  margin: 12px 0 0 24px;
  text-align: left;
  font-size: 18px;
  font-weight: 400;
`;
const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
// 드롭다운을 위한 스타일
const DropdownBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 28px;
  background-color: #c4c4c4;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
`;
const DropdownContent = styled.div`
  padding: 15px;
  /* background-color: #fff; */
  /* box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06); */
  font-weight: 500;
  /* color: #333; */
  width: 90%;
  background-color: #e4e4e4;
  border-radius: 20px;
  margin-top: 5px;
`;
const DropdownItem = styled.div`
  padding: 2px 10px;
  cursor: pointer;
  &:hover {
    border: 2px solid pink;
    border-radius: 20px;
  }
`;

export default LocationCategory;
