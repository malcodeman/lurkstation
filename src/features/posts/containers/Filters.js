import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Manager, Reference, Popper } from "react-popper";
import OutsideClickHandler from "react-outside-click-handler";

import { ReactComponent as ChevronDown } from "../media/chevron-down.svg";
import { changeFilter } from "../actions/postsActions";

const StyledFilters = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Button = styled.button`
  border: 0;
  color: #fff;
  background-color: transparent;
  padding: 6px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  cursor: pointer;
  visibility: ${props => (props.hidden ? "hidden" : "visible")};
`;

const ButtonText = styled.span`
  margin-right: 4px;
`;

const DropdownsWrapper = styled.div`
  display: flex;
`;

const DropdownIcon = styled(ChevronDown)`
  color: #fff;
  width: 16px;
  height: 16px;
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 10px;
  border-radius: 2px;
  background-color: #1bb76e;
`;

const DropdownItem = styled.span`
  padding: 4px 0;
  cursor: pointer;
`;

class Filters extends Component {
  state = {
    sortDropdown: false,
    timeDropdown: false,
    sorts: ["hot", "new", "controversial", "top", "rising"],
    times: ["hour", "day", "week", "month", "year", "all"]
  };
  handleSortFilter = () => {
    this.setState({ sortDropdown: !this.state.sortDropdown });
  };
  handleTimeFilter = () => {
    this.setState({ timeDropdown: !this.state.timeDropdown });
  };
  render() {
    const { changeFilter, subreddit, sort, time, after } = this.props;
    const { sortDropdown, timeDropdown, sorts, times } = this.state;

    return (
      <StyledFilters>
        <div />

        <DropdownsWrapper>
          <OutsideClickHandler
            onOutsideClick={() => {
              this.setState({ sortDropdown: false });
            }}
          >
            <Manager>
              <Reference>
                {({ ref }) => (
                  <Button ref={ref} onClick={this.handleSortFilter}>
                    <ButtonText>{sort}</ButtonText>
                    <DropdownIcon />
                  </Button>
                )}
              </Reference>
              {sortDropdown ? (
                <Popper placement="bottom-end">
                  {({ ref, style, placement, arrowProps }) => (
                    <Dropdown
                      ref={ref}
                      style={style}
                      data-placement={placement}
                    >
                      {sorts.map(sort => (
                        <DropdownItem
                          key={sort}
                          onClick={() =>
                            changeFilter(subreddit, sort, time, after)
                          }
                        >
                          {sort}
                        </DropdownItem>
                      ))}
                    </Dropdown>
                  )}
                </Popper>
              ) : null}
            </Manager>
          </OutsideClickHandler>
          <OutsideClickHandler
            onOutsideClick={() => {
              this.setState({ timeDropdown: false });
            }}
          >
            <Manager>
              <Reference>
                {({ ref }) => (
                  <Button
                    ref={ref}
                    onClick={this.handleTimeFilter}
                    hidden={
                      sort === "hot" || sort === "new" || sort === "rising"
                    }
                  >
                    <ButtonText>{time}</ButtonText>
                    <DropdownIcon />
                  </Button>
                )}
              </Reference>
              {timeDropdown ? (
                <Popper placement="bottom-end">
                  {({ ref, style, placement, arrowProps }) => (
                    <Dropdown
                      ref={ref}
                      style={style}
                      data-placement={placement}
                    >
                      {times.map(time => (
                        <DropdownItem
                          key={time}
                          onClick={() =>
                            changeFilter(subreddit, sort, time, after)
                          }
                        >
                          {time}
                        </DropdownItem>
                      ))}
                    </Dropdown>
                  )}
                </Popper>
              ) : null}
            </Manager>
          </OutsideClickHandler>
        </DropdownsWrapper>
      </StyledFilters>
    );
  }
}

const mapStateToProps = state => {
  return {
    subreddit: state.posts.subreddit,
    sort: state.posts.sort,
    time: state.posts.time,
    after: state.posts.after
  };
};

export default connect(
  mapStateToProps,
  { changeFilter }
)(Filters);
