import React, { cloneElement, useState } from "react";
import PropTypes from "prop-types";
import usePopper from "use-popper";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "styled-components";

const StyledDropdown = styled.div`
  margin-right: ${props => props.mr && `${props.mr}rem`};
`;

function Dropdown(props) {
  const { placement, overlay, mr, children } = props;
  const { reference, popper } = usePopper({ placement });
  const [visible, setVisible] = useState(props.visible);

  function handleOnClick() {
    const state = visible ? false : true;

    setVisible(state);
  }

  return (
    <StyledDropdown mr={mr}>
      <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
        {cloneElement(children, {
          ref: reference.ref,
          onClick: handleOnClick
        })}
        {visible &&
          cloneElement(overlay, {
            ref: popper.ref,
            style: popper.styles,
            onClick: () => setVisible(false)
          })}
      </OutsideClickHandler>
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
  overlay: PropTypes.object,
  visible: PropTypes.bool,
  mr: PropTypes.number
};

Dropdown.defaultProps = {
  placement: "bottom-start",
  overlay: null,
  visible: false,
  mr: 0
};

export default Dropdown;
