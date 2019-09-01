import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled, { withTheme } from "styled-components";
import { withRouter } from "react-router-dom";
import Observer from "@researchgate/react-intersection-observer";

import { searchPosts, getPosts } from "../actions/postsActions";
import { getParam } from "../../../core/utils";
import { useScrollToTop, useWindowSize } from "../../../core/hooks";
import {
  DEFAULT_SUBREDDIT,
  DEFAULT_LISTING_SORT,
  DEFAULT_TIME_SORT
} from "../../../core/constants";
import Post from "./Post";
import PostMobile from "./PostMobile";
import Spin from "../../commonComponents/Spin";

const Grid = styled.div`
  @media (min-width: 576px) {
    display: grid;
    grid-auto-rows: 280px;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  }
`;

function Posts(props) {
  const {
    searchPosts,
    getPosts,
    posts,
    fetching,
    match,
    nsfwMode,
    dataSaverMode,
    theme
  } = props;
  const subreddit = match.params.subreddit || DEFAULT_SUBREDDIT;
  const listing = match.params.listing || DEFAULT_LISTING_SORT;
  const time = getParam("time") || DEFAULT_TIME_SORT;
  const disableObserver = posts.length === 0 || fetching;
  const { width } = useWindowSize();

  useScrollToTop(subreddit, listing, time);

  useEffect(() => {
    searchPosts(subreddit, listing, time);
  }, [searchPosts, subreddit, listing, time]);

  function handleIntersecting({ isIntersecting }) {
    const { after } = props;

    if (isIntersecting) {
      getPosts(subreddit, listing, time, after);
    }
  }

  return (
    <>
      <Grid>
        {posts.length > 0 &&
          posts.map((post, index) => {
            const lastPost = index === posts.length - 1;
            const censure = !nsfwMode && post.nsfw;
            const showThumbnail = dataSaverMode && post.thumbnail !== "nsfw";
            const postComponent =
              width >= 576 ? (
                <Post
                  key={post.id}
                  id={post.id}
                  url={post.url}
                  thumbnail={post.thumbnail}
                  title={post.time}
                  upvotesCount={post.upvotes_count}
                  commentsCount={post.comments_count}
                  isVideo={post.is_video}
                  censure={censure}
                  showThumbnail={showThumbnail}
                  postUrl={post.post_url}
                  subreddit={subreddit}
                  listing={listing}
                  time={time}
                />
              ) : (
                <PostMobile
                  key={post.id}
                  url={post.url}
                  thumbnail={post.thumbnail}
                  title={post.title}
                  upvotesCount={post.upvotes_count}
                  commentsCount={post.comments_count}
                  isVideo={post.is_video}
                  createdAt={post.created_at}
                  censure={censure}
                  showThumbnail={showThumbnail}
                  theme={theme}
                />
              );

            if (lastPost) {
              return (
                <Observer
                  key={post.id}
                  onChange={handleIntersecting}
                  disabled={disableObserver}
                >
                  <div>{postComponent}</div>
                </Observer>
              );
            }
            return postComponent;
          })}
      </Grid>
      <Spin
        paddingTop={1}
        paddingBottom={1}
        spinning={fetching}
        color={theme.brand}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    fetching: state.posts.fetching,
    after: state.posts.after,
    nsfwMode: state.settings.nsfwMode,
    dataSaverMode: state.settings.dataSaverMode
  };
};

const withConnect = connect(
  mapStateToProps,
  { searchPosts, getPosts }
);

export default compose(
  withConnect,
  withRouter,
  withTheme
)(Posts);
