import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledInput = styled.input`
  font-size: 1rem;
  border: 2px solid transparent;
  padding: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  line-height: 1.5;
  color: ${props => props.theme.primary};
  transition: ${props => props.theme.transitions.easeIn};
  background-color: ${props => props.theme.backgroundInput};
  &:focus {
    border-color: ${props => props.theme.borderColor};
  }
  ::placeholder {
    color: ${props => props.theme.placeholder};
  }
`;

function Input(props) {
  const {
    name,
    disabled,
    placeholder,
    type,
    onChange,
    onBlur,
    onPressEnter,
    value,
    children
  } = props;

  function handleOnPressEnter(event) {
    const codes = {
      enter: 13
    };

    if (event.code === codes.enter) {
      onPressEnter();
    }
  }

  return (
    <StyledInput
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={handleOnPressEnter}
      value={value}
    >
      {children}
    </StyledInput>
  );
}

Input.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "password"]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onPressEnter: PropTypes.func,
  value: PropTypes.string
};

Input.defaultProps = {
  disabled: false,
  type: "text"
};

export default Input;
