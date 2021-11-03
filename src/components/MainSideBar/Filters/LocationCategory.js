import React, { useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { MdLocationOn } from "react-icons/md";

import "../../../nav.css";
import { FaBars, FaChevronLeft, FaChevronRight } from "react-icons/fa"; //목록 아이콘,<,>
// import "./LocationCategory.css";
const LocationCategory = () => {
  return (
    <div>
    <Navbar>
       <NavItem icon={<FaBars/>}>
         <DropdownMenuThree/>
         </NavItem>
     </Navbar>
   
 
 
   </div>
 
   );
 }
 
 function Navbar(props) {
   return (
     <nav className="navbar">
       <ul className="navbar-nav"> 
       {props.children}  
       </ul>
     </nav>
   )
 }
 
 function NavItem(props) {
   const [open, setOpen] = useState(false);
   return (
     <div className="nav-item">
       <a className="icon-button" onMouseEnter={()=> setOpen(!open)} >
         {props.icon}
       </a>
       {open && props.children}
     </div>
   )
 }
 
 
 function DropdownMenuThree() {
   const [activeMenu, setActiveMenu] = useState('main')
   const [open, setOpen] = useState(false);
   function DropdownItem(props) {
     return (
       <a href="#" className="menu-item" onClick={() =>props.goToMenu && setActiveMenu(props.goToMenu)}>
       
         {props.children}
     
       </a>
     )
   }
 
  return (
    <div className="dropdown">
         
 
         <CSSTransition in = {activeMenu === 'main'}
         unmountOnExit
         timeout= {500}
         classNames="menu-primary"
         > 
         <div className= "menu" 
         >
            <DropdownItem
         goToMenu="top"
         >
         서울
  
         </DropdownItem>
         <DropdownItem
         goToMenu="bottom"
         >
         부산
 
         </DropdownItem>
        
         <DropdownItem
         goToMenu="accessory"
         >
         대구
 
         </DropdownItem>
          </div>
       </CSSTransition>
 
       <CSSTransition in = {activeMenu === 'top'}
         unmountOnExit
         timeout= {500}
         classNames="menu-secondary"
         > 
           <div className= "menu">
         <DropdownItem
           goToMenu="main"
         >
         
           <FaChevronLeft/>
         </DropdownItem>
         <DropdownItem>
           반포한강공원
         </DropdownItem>
         <DropdownItem>
           여의도한강공원
         </DropdownItem>
         <DropdownItem>
           뚝섬한강공원
         </DropdownItem>
         <DropdownItem>
           서울숲
         </DropdownItem>
         <DropdownItem>
           올림픽공원
         </DropdownItem>
         </div>
         </CSSTransition>
 
         <CSSTransition in = {activeMenu === 'bottom'}
         unmountOnExit
         timeout= {500}
         classNames="menu-secondary"
         > 
           <div className= "menu">
         <DropdownItem
           goToMenu="main"
         >
         
           <FaChevronLeft/>
         </DropdownItem>
         <DropdownItem>
           부산시민공원
         </DropdownItem>
         <DropdownItem>
           광안리해수욕장
         </DropdownItem>
        
         </div>
         </CSSTransition>
 
         <CSSTransition in = {activeMenu === 'accessory'}
         unmountOnExit
         timeout= {500}
         classNames="menu-secondary"
         > 
           <div className= "menu">
         <DropdownItem
           goToMenu="main"
         >
         
           <FaChevronLeft/>
         </DropdownItem>
         <DropdownItem>
           대구
         </DropdownItem>
       
        
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
