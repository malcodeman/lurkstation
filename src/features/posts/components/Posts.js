import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { searchPosts } from "../actions/postsActions";
import { getParam } from "../../../core/utils";
import {
  DEFAULT_SUBREDDIT,
  DEFAULT_LISTING_SORT,
  DEFAULT_TIME_SORT
} from "../../../core/constants";
import Post from "./Post";

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 280px;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  min-height: 100vh;
`;

function Posts(props) {
  const { searchPosts, posts, match } = props;
  const subreddit = match.params.subreddit || DEFAULT_SUBREDDIT;
  const listing = match.params.listing || DEFAULT_LISTING_SORT;
  const time = getParam("time") || DEFAULT_TIME_SORT;

  useEffect(() => {
    searchPosts(subreddit, listing, time);
  }, [searchPosts, subreddit, listing, time]);

  return (
    <Grid>
      {posts.length > 0 &&
        posts.map(post => {
          return (
            <Post
              key={post.id}
              url={post.url}
              postUrl={post.post_url}
              commentsCount={post.comments_count}
              likesCount={post.likes_count}
            />
          );
        })}
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts
  };
};

const withConnect = connect(
  mapStateToProps,
  { searchPosts }
);

export default compose(
  withConnect,
  withRouter
)(Posts);
