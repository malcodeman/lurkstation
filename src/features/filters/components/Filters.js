import React from "react";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

import { getParam } from "../../../core/utils";
import {
  DEFAULT_SUBREDDIT,
  DEFAULT_LISTING_SORT,
  DEFAULT_TIME_SORT
} from "../../../core/constants";
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

const MenuItem = styled.li``;

const StyledLink = styled(Link)`
  display: block;
  color: #06070d;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => `${props.theme.brand}33`};
  }
`;

function Filters(props) {
  const { match, location } = props;
  const subreddit = match.params.subreddit || DEFAULT_SUBREDDIT;
  const listingMenu = (
    <Menu>
      <MenuItem>
        <StyledLink to={`/${subreddit}/hot`}>What's Hot</StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to={`/${subreddit}/new`}>Most recent</StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to={`/${subreddit}/controversial`}>
          Controversial
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to={`/${subreddit}/top`}>Top</StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to={`/${subreddit}/rising`}>Rising</StyledLink>
      </MenuItem>
    </Menu>
  );
  const { pathname } = location;
  const timeMenu = (
    <Menu>
      <MenuItem>
        <StyledLink to={`${pathname}?time=hour`}>Hour</StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to={`${pathname}?time=day`}>Day</StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to={`${pathname}?time=week`}>Week</StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to={`${pathname}?time=month`}>Month</StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to={`${pathname}?time=all`}>All</StyledLink>
      </MenuItem>
    </Menu>
  );
  const listingSort = match.params.listing || DEFAULT_LISTING_SORT;
  const renderTimeSort =
    listingSort === "controversial" || listingSort === "top";
  const timeSort = getParam("time") || DEFAULT_TIME_SORT;

  return (
    <StyledFilters>
      <Panel>
        <Dropdown overlay={listingMenu} mr={1}>
          <Filter>
            <Text size={1} mr={0.5}>
              {listingSort}
            </Text>
            <ChevronDown />
          </Filter>
        </Dropdown>
        {renderTimeSort && (
          <Dropdown overlay={timeMenu} mr={1}>
            <Filter>
              <Text size={1} mr={0.5}>
                {timeSort}
              </Text>
              <ChevronDown />
            </Filter>
          </Dropdown>
        )}
      </Panel>
    </StyledFilters>
  );
}

export default compose(withRouter)(Filters);
