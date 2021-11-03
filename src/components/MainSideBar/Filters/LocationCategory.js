import React, { useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { MdLocationOn } from "react-icons/md";

import "../../../nav.css";
import { FaBars, FaChevronLeft, FaChevronRight } from "react-icons/fa"; //목록 아이콘,<,>
import "./LocationCategory.css";
const LocationCategory = () => {
  return (
    <div>
      <Navbar>
        <NavItem icon={<FaBars />}>
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
    <div className="nav-item">
      <a className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </div>
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
        {props.children}
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
          <DropdownItem goToMenu="accessory">대구</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "top"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem goToMenu="main">
            <FaChevronLeft />
          </DropdownItem>
          <DropdownItem>반포한강공원</DropdownItem>
          <DropdownItem>여의도한강공원</DropdownItem>
          <DropdownItem>뚝섬한강공원</DropdownItem>
          <DropdownItem>서울숲</DropdownItem>
          <DropdownItem>올림픽공원</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "bottom"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem goToMenu="main">
            <FaChevronLeft />
          </DropdownItem>
          <DropdownItem>부산시민공원</DropdownItem>
          <DropdownItem>광안리해수욕장</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "accessory"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem goToMenu="main">
            <FaChevronLeft />
          </DropdownItem>
          <DropdownItem>대구</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default LocationCategory;
