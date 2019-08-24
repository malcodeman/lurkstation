import React, { cloneElement, useState, useRef } from "react";
import PropTypes from "prop-types";
import usePopper from "use-popper";
import styled, { css } from "styled-components";

import { useKeyPress, useOnClickOutside } from "../../core/hooks";

const StyledDropdown = styled.div`
  ${props =>
    props.mr &&
    css`
      margin-right: ${props.mr}rem;
    `}
`;

function Dropdown(props) {
  const {
    placement,
    overlay,
    mr,
    shouldCloseOnExternalClick,
    isVisible,
    children
  } = props;
  const { reference, popper } = usePopper({ placement });
  const [visible, setVisible] = useState(false);
  const isShown = visible || isVisible;
  const ref = useRef();

  useKeyPress("Escape", close);
  useOnClickOutside(ref, shouldCloseOnExternalClick && close);

  function handleToggle() {
    const state = visible ? false : true;

    setVisible(state);
  }

  function close() {
    setVisible(false);
  }

  return (
    <StyledDropdown ref={ref} mr={mr}>
      {cloneElement(children, {
        ref: reference.ref,
        onClick: handleToggle
      })}
      {isShown &&
        cloneElement(overlay({ close }), {
          ref: popper.ref,
          style: popper.styles
        })}
    </StyledDropdown>
  );
}

Dropdown.propTypes = {
  placement: PropTypes.oneOf([
    "auto",
    "auto-start",
    "auto-end",
    "top",
    "top-start",
    "top-end",
    "right",
    "right-start",
    "right-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end"
  ]),
  overlay: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isVisible: PropTypes.bool,
  mr: PropTypes.number
};

Dropdown.defaultProps = {
  placement: "bottom-start",
  isVisible: false,
  mr: 0,
  shouldCloseOnExternalClick: true
};

export default Dropdown;
