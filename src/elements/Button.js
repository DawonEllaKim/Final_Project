import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, padding, margin, children, position, top, left, right } = props;

  const styles = {
    padding,
    margin,
    position,
    top,
    left,
    right
  };
  return (
    <>
      <CircleBtn {...styles} onClick={_onClick}>
        {text ? text : children}
      </CircleBtn>
    </>
  );
};

Button.defaultProps = {
  text: false,
  _onClick: () => {},
  padding: false,
  margin: false,
  children: null,
  position: false,
  top: false,
  left: false,
  right: false
};

const CircleBtn = styled.button`
  width: 48px;
  height: 48px;
  background-color: #fff;
  border: 2px solid black;
  box-sizing: border-box;
  border-radius: 50%;
  font-size: ${(props) => (props.size ? props.size : "")};
  font-weight: 600;
  box-shadow: 0px 4px black;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  cursor: pointer;
`;

export default Button;
