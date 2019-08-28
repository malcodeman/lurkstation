import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";

import {
  toggleDarkMode,
  toggleDataSaverMode,
  toggleNsfwMode
} from "../../settings/actions/settingsActionCreators";
import Logo from "../../commonComponents/Logo";
import Dropdown from "../../commonComponents/Dropdown";
import Switch from "../../commonComponents/Switch";
import User from "../../commonAssets/icons/User";
import SearchForm from "./SearchForm";

const StyledHeader = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  height: 54px;
  z-index: 2;
  color: ${props => props.theme.primary};
  background-color: ${props => props.theme.backgroundPrimary};
`;

const Menu = styled.ul`
  padding: 0.5rem 0;
  background-color: #fff;
  list-style-type: none;
  margin: 0;
  width: 240px;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #06070d;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => `${props.theme.brand}33`};
  }
`;

const MenuLabel = styled.span`
  font-size: 0.8rem;
`;

const Profile = styled.div`
  padding: 0 1rem;
  cursor: pointer;
`;

function Header(props) {
  const {
    darkMode,
    dataSaverMode,
    nsfwMode,
    toggleDarkMode,
    toggleDataSaverMode,
    toggleNsfwMode
  } = props;

  function toggleState(callback, currentState) {
    const newState = currentState ? false : true;

    callback(newState);
  }

  return (
    <StyledHeader>
      <Logo ml={1} mr={1} />
      <SearchForm />
      <Dropdown
        overlay={({ close }) => (
          <Menu>
            <MenuItem onClick={() => toggleState(toggleDarkMode, darkMode)}>
              <MenuLabel>Dark mode</MenuLabel>
              <Switch state={darkMode} />
            </MenuItem>
            <MenuItem
              onClick={() => toggleState(toggleDataSaverMode, dataSaverMode)}
            >
              <MenuLabel>Data saver</MenuLabel>
              <Switch state={dataSaverMode} />
            </MenuItem>
            <MenuItem onClick={() => toggleState(toggleNsfwMode, nsfwMode)}>
              <MenuLabel>Display Mature Content</MenuLabel>
              <Switch state={nsfwMode} />
            </MenuItem>
            <MenuItem onClick={close}>
              <MenuLabel>Help and FAQ</MenuLabel>
            </MenuItem>
          </Menu>
        )}
      >
        <Profile>
          <User size={24} />
        </Profile>
      </Dropdown>
    </StyledHeader>
  );
}

const mapStateToProps = state => {
  return {
    darkMode: state.settings.darkMode,
    dataSaverMode: state.settings.dataSaverMode,
    nsfwMode: state.settings.nsfwMode
  };
};

const withConnect = connect(
  mapStateToProps,
  { toggleDarkMode, toggleDataSaverMode, toggleNsfwMode }
);

export default compose(withConnect)(Header);
