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
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 54px;
  z-index: 1;
  padding: 1rem;
  margin-top: 54px;
  height: 60px;
  color: ${props => props.theme.primary};
  background-color: ${props => `${props.theme.backgroundSecondary}F2`};
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
  const { pathname } = location;
  const listingSort = match.params.listing || DEFAULT_LISTING_SORT;
  const renderTimeSort =
    listingSort === "controversial" || listingSort === "top";
  const timeSort = getParam("time") || DEFAULT_TIME_SORT;

  function parseListingSortLabel(listing) {
    switch (listing) {
      case "hot":
        return "What's Hot";
      case "new":
        return "Most recent";
      case "controversial":
        return "Controversial";
      case "top":
        return "Top";
      case "rising":
        return "Rising";
      default:
        return "";
    }
  }

  function parseTimeSortLabel(listing) {
    switch (listing) {
      case "hour":
        return "Now";
      case "day":
        return "Today";
      case "week":
        return "This week";
      case "month":
        return "This month";
      case "year":
        return "This year";
      case "all":
        return "All Time";
      default:
        return "";
    }
  }

  return (
    <StyledFilters>
      <Panel>
        <Dropdown
          mr={1}
          overlay={({ close }) => (
            <Menu>
              <MenuItem onClick={close}>
                <StyledLink to={`/${subreddit}/hot`}>What's Hot</StyledLink>
              </MenuItem>
              <MenuItem onClick={close}>
                <StyledLink to={`/${subreddit}/new`}>Most recent</StyledLink>
              </MenuItem>
              <MenuItem onClick={close}>
                <StyledLink to={`/${subreddit}/controversial`}>
                  Controversial
                </StyledLink>
              </MenuItem>
              <MenuItem onClick={close}>
                <StyledLink to={`/${subreddit}/top`}>Top</StyledLink>
              </MenuItem>
              <MenuItem onClick={close}>
                <StyledLink to={`/${subreddit}/rising`}>Rising</StyledLink>
              </MenuItem>
            </Menu>
          )}
        >
          <Filter>
            <Text size={1} mr={0.5}>
              {parseListingSortLabel(listingSort)}
            </Text>
            <ChevronDown />
          </Filter>
        </Dropdown>
        {renderTimeSort && (
          <Dropdown
            mr={1}
            overlay={({ close }) => (
              <Menu>
                <MenuItem onClick={close}>
                  <StyledLink to={`${pathname}?time=hour`}>Hour</StyledLink>
                </MenuItem>
                <MenuItem onClick={close}>
                  <StyledLink to={`${pathname}?time=day`}>Day</StyledLink>
                </MenuItem>
                <MenuItem onClick={close}>
                  <StyledLink to={`${pathname}?time=week`}>Week</StyledLink>
                </MenuItem>
                <MenuItem onClick={close}>
                  <StyledLink to={`${pathname}?time=month`}>Month</StyledLink>
                </MenuItem>
                <MenuItem onClick={close}>
                  <StyledLink to={`${pathname}?time=all`}>All</StyledLink>
                </MenuItem>
              </Menu>
            )}
          >
            <Filter>
              <Text size={1} mr={0.5}>
                {parseTimeSortLabel(timeSort)}
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
