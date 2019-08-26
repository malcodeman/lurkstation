import React, { createRef, cloneElement } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";

import {
  useOnClickOutside,
  useKeyPress,
  useLockBodyScroll
} from "../../core/hooks";

const MODAL_ROOT = document.getElementById("modal-root");

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  @media (min-width: 768px) {
    ${props =>
      props.padding &&
      css`
        padding: ${props.padding}rem;
      `}
  }
`;

function Modal(props) {
  const { onCancel, padding, children } = props;
  const ref = createRef();

  useLockBodyScroll();
  useOnClickOutside(ref, onCancel);
  useKeyPress("Escape", onCancel);

  return ReactDOM.createPortal(
    <StyledModal padding={padding}>
      {cloneElement(children, {
        ref
      })}
    </StyledModal>,
    MODAL_ROOT
  );
}

Modal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  padding: PropTypes.number
};

Modal.defaultProps = {
  padding: 0
};

export default Modal;
