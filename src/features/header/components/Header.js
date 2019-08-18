import React from "react";
import styled from "styled-components";

import Logo from "../../commonComponents/Logo";
import SearchForm from "./SearchForm";

const StyledHeader = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 0.5rem 0;
  height: 54px;
  color: ${props => props.theme.primary};
  background-color: ${props => props.theme.backgroundPrimary};
`;

function Header(props) {
  return (
    <StyledHeader>
      <Logo ml={1} mr={1} />
      <SearchForm />
    </StyledHeader>
  );
}

export default Header;
