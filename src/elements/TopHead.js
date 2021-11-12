import React from "react";
import styled from "styled-components";
import Button from "./Button";

const TopHead = (props) => {
  const { bold, color, size, children, margin } = props;
  const styles = { bold: bold, color: color, size: size, margin: margin };

  return (
    <Wrap>
      <Button />
      <P {...styles}>{children}</P>
      <Button />
    </Wrap>
  );
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#000",
  size: "14px",
  margin: false,
};

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
const P = styled.p`
  color: ${(props) => props.color};
`;

export default TopHead;
