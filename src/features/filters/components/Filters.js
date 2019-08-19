import React from "react";
import styled from "styled-components";

import Dropdown from "../../commonComponents/Dropdown";
import Text from "../../commonComponents/Text";
import ChevronDown from "../../commonAssets/icons/ChevronDown";

const StyledFilters = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  color: ${props => props.theme.primary};
  background-color: ${props => props.theme.backgroundSecondary};
`;

const Panel = styled.div`
  display: flex;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Menu = styled.ul`
  padding: 0.5rem 0;
  background-color: #fff;
  list-style-type: none;
  margin: 0;
`;

const MenuItem = styled.li`
  color: #06070d;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => `${props.theme.brand}33`};
  }
`;

function Filters(props) {
  const menu = (
    <Menu>
      <MenuItem>Most recent</MenuItem>
      <MenuItem>Popular 24 hours</MenuItem>
    </Menu>
  );

  return (
    <StyledFilters>
      <Panel>
        <Dropdown overlay={menu} mr={1}>
          <Filter>
            <Text size={1} mr={0.5}>
              What's Hot
            </Text>
            <ChevronDown />
          </Filter>
        </Dropdown>
      </Panel>
    </StyledFilters>
  );
}

export default Filters;
