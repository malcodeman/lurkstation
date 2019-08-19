import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledText = styled.span`
  display: inline-block;
  line-height: 1.5;
  font-size: ${props => `${props.size}rem`};
  font-weight: ${props => props.strong && "500"};
  margin-top: ${props => props.mt && `${props.mt}rem`};
  margin-left: ${props => props.ml && `${props.ml}rem`};
  transition: ${props => props.theme.transitions.easeIn};
  margin-right: ${props => props.mr && `${props.mr}rem`};
  margin-bottom: ${props => props.mb && `${props.mb}rem`};
  padding-bottom: ${props => props.underline && ".14rem"};
  text-transform: ${props => props.upperCase && "uppercase"};
  color: ${props =>
    (props.type && props.theme.text[props.type]) ||
    props.color ||
    props.theme.primary};
  border-bottom: ${props =>
    props.underline && `2px solid ${props.color || props.theme.borderColor}`};
  letter-spacing: ${props => props.letterSpacing && `${props.letterSpacing}em`};
  &:hover {
    border-color: currentColor;
  }
`;

function Text(props) {
  const {
    mt,
    mr,
    mb,
    ml,
    children,
    type,
    underline,
    strong,
    upperCase,
    color,
    size,
    letterSpacing
  } = props;

  return (
    <StyledText
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      type={type}
      underline={underline}
      strong={strong}
      upperCase={upperCase}
      color={color}
      size={size}
      letterSpacing={letterSpacing}
    >
      {children}
    </StyledText>
  );
}

Text.propTypes = {
  mt: PropTypes.number,
  mr: PropTypes.number,
  mb: PropTypes.number,
  ml: PropTypes.number,
  type: PropTypes.oneOf(["secondary", "warning", "danger"]),
  underline: PropTypes.bool,
  strong: PropTypes.bool,
  upperCase: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number,
  letterSpacing: PropTypes.number
};

Text.defaultProps = {
  underline: false,
  strong: false,
  upperCase: false,
  size: 0.8
};

export default Text;
