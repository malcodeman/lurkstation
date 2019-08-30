import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Spin from "./Spin";
import SearchIcon from "../commonAssets/icons/Search";

const commonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  width: ${props => props.block && "100%"};
  border-radius: ${props => props.theme.borderRadius};
  transition: ${props => props.theme.transitions.easeIn};
  margin-bottom: ${props => props.mb && `${props.mb}rem`};
  color: ${props => props.theme.button[props.styleType].color};
  background-color: ${props => props.theme.button[props.styleType].background};
`;

const StyledButton = styled.button`
  ${commonStyle}
  &:hover:enabled {
    opacity: 0.85;
  }
  &:disabled {
    cursor: default;
    color: ${props => props.theme.button.disabled.color};
    background-color: ${props => props.theme.button.disabled.background};
  }
`;

const Link = styled.a`
  ${commonStyle}
  &:hover {
    opacity: 0.85;
  }
`;

function Button(props) {
  const {
    onClick,
    disabled,
    type,
    htmlType,
    loading,
    children,
    icon,
    href,
    target,
    mb,
    block
  } = props;

  function handleIcon(icon) {
    const style = {
      marginRight: "0.5rem"
    };

    switch (icon) {
      case "search":
        return <SearchIcon style={children && style} />;
      default:
        return null;
    }
  }

  if (href) {
    return (
      <Link
        rel="noopener noreferrer"
        href={href}
        target={target}
        styleType={type}
        mb={mb}
        block={block}
      >
        {loading && <Spin />}
        {icon && !loading && handleIcon(icon)}
        {children}
      </Link>
    );
  }

  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      styleType={type}
      type={htmlType}
      mb={mb}
      block={block}
    >
      {loading && <Spin />}
      {icon && !loading && handleIcon(icon)}
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  block: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["default", "small", "large"]),
  type: PropTypes.oneOf([
    "default",
    "primary",
    "ghost",
    "dashed",
    "danger",
    "link"
  ]),
  htmlType: PropTypes.oneOf(["button", "submit", "reset"]),
  icon: PropTypes.oneOf(["link", "search", "google"]),
  href: PropTypes.string,
  target: PropTypes.string,
  mb: PropTypes.number
};

Button.defaultProps = {
  disabled: false,
  loading: false,
  block: false,
  size: "default",
  type: "default",
  htmlType: "button",
  mb: 0
};

export default Button;
