import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Pill = styled.div`
  display: flex;
  height: 20px;
  width: 32px;
  padding: 2px;
  border-radius: 16px;
  cursor: pointer;
  justify-content: ${props => (props.state ? "flex-end" : "flex-start")};
  background-color: ${props =>
    props.state ? props.theme.brand : "hsla(0, 0%, 0%, 0.5)"};
`;

const Circle = styled.div`
  background-color: hsl(0, 0%, 100%);
  border-radius: 50%;
  width: 16px;
`;

function Switch(props) {
  const { state } = props;

  return (
    <Pill state={state}>
      <Circle />
    </Pill>
  );
}

Switch.propTypes = {
  state: PropTypes.bool
};

Switch.defaultProps = {
  state: false
};

export default Switch;
