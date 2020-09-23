import React from "react";
import PropTypes from "prop-types";
import styled, { useTheme } from "styled-components";
import { Link } from "react-router-dom";

import LogoIcon from "../commonAssets/icons/Logo";
import { NAME } from "../../core/constants";

const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: ${(props) => props.ml && `${props.ml}rem`};
  margin-right: ${(props) => props.mr && `${props.mr}rem`};
`;

const BrandText = styled.span`
  display: none;
  font-size: 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  @media (min-width: 576px) {
    display: inline;
  }
  color: ${(props) => props.theme.primary};
`;

function Logo(props) {
  const { to, color, size, ml, mr } = props;
  const theme = useTheme();

  return (
    <BrandLink to={to} ml={ml} mr={mr}>
      <LogoIcon color={color || theme.brand} size={size} />
      <BrandText>{NAME}</BrandText>
    </BrandLink>
  );
}

Logo.propTypes = {
  to: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  ml: PropTypes.number,
  mr: PropTypes.number,
};

Logo.defaultProps = {
  to: "/",
  size: 16,
  ml: 0,
  mr: 0,
};

export default Logo;
