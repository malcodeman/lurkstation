import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Subreddit from "./Subreddit";
import { getPopularSubs } from "../actions/postsActions";

const SubredditGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class PopularSubs extends Component {
  componentDidMount() {
    const { getPopularSubs } = this.props;

    getPopularSubs();
  }
  render() {
    const { popularSubs } = this.props;

    return (
      <SubredditGrid>
        {popularSubs &&
          popularSubs.map(subreddit => {
            return (
              <Subreddit
                key={subreddit.id}
                name={subreddit.name}
                name_prefixed={subreddit.name_prefixed}
                subscribers_count={subreddit.subscribers_count}
              />
            );
          })}
      </SubredditGrid>
    );
  }
}

const mapStateToProps = state => {
  return {
    popularSubs: state.posts.popularSubs
  };
};

export default connect(
  mapStateToProps,
  { getPopularSubs }
)(PopularSubs);
