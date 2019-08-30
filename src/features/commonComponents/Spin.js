import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes, css } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  padding-top: ${props => props.paddingTop && `${props.paddingTop}rem`};
  padding-bottom: ${props =>
    props.paddingBottom && `${props.paddingBottom}rem`};
  ${props =>
    props.spinning
      ? css`
          display: flex;
          align-items: center;
          justify-content: center;
        `
      : css`
          display: none;
        `}
`;

const StyledSpin = styled.div`
  border: 2px solid ${props => props.color};
  border-radius: 50%;
  border-top: 2px solid transparent;
  animation ${rotate360} 2s linear infinite;
    ${props => {
      switch (props.size) {
        case "small":
          return css`
            width: 0.8rem;
            height: 0.8rem;
          `;
        case "large":
          return css`
            width: 1.2rem;
            height: 1.2rem;
          `;
        default:
          return css`
            width: 1rem;
            height: 1rem;
          `;
      }
    }}
`;

const Tip = styled.span`
  margin-left: 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.theme.primary};
`;

function Spin(props) {
  const { spinning, size, paddingTop, paddingBottom, tip, color } = props;

  return (
    <Wrapper
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      spinning={spinning}
    >
      <StyledSpin size={size} color={color} />
      {tip && <Tip>{tip}</Tip>}
    </Wrapper>
  );
}

Spin.propTypes = {
  tip: PropTypes.string,
  size: PropTypes.oneOf(["small", "default", "large"]),
  spinning: PropTypes.bool,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  color: PropTypes.string
};

Spin.defaultProps = {
  tip: "",
  size: "default",
  spinning: true,
  paddingTop: 0,
  paddingBottom: 0,
  color: "currentColor"
};

export default Spin;
