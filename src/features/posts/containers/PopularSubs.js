import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Subreddit from "./Subreddit";
import Loader from "../../loader/components/Loader";
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
  getUniqueSubs = subs => {
    const uniqueSubs = [...new Set(subs.map(sub => JSON.stringify(sub)))].map(
      sub => JSON.parse(sub)
    );
    return uniqueSubs;
  };
  render() {
    const { popularSubs } = this.props;

    return (
      <SubredditGrid>
        {popularSubs ? (
          this.getUniqueSubs(popularSubs).map(subreddit => {
            return (
              <Subreddit
                key={subreddit.id}
                name={subreddit.name}
                name_prefixed={subreddit.name_prefixed}
                subscribers_count={subreddit.subscribers_count}
              />
            );
          })
        ) : (
          <Loader message={"Fetching popular subreddits"} />
        )}
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
