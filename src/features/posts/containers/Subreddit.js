import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const StyledSubreddit = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
  color: #fff;
  border-radius: 4px;
  background-color: #b54f9b;
`;

const SubsCount = styled.span`
  opacity: 0.8;
`;

class Subreddit extends Component {
  render() {
    const { name, subscribers_count } = this.props;

    return (
      <StyledSubreddit>
        <span>{name}</span>
        <SubsCount>{subscribers_count} subs</SubsCount>
      </StyledSubreddit>
    );
  }
}

export default connect(
  null,
  null
)(Subreddit);
