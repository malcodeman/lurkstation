import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Observer from "@researchgate/react-intersection-observer";

import { searchPosts, getPosts } from "../actions/postsActions";
import { getParam } from "../../../core/utils";
import {
  DEFAULT_SUBREDDIT,
  DEFAULT_LISTING_SORT,
  DEFAULT_TIME_SORT
} from "../../../core/constants";
import Post from "./Post";
import Spin from "../../commonComponents/Spin";

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 280px;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
`;

function Posts(props) {
  const {
    searchPosts,
    getPosts,
    posts,
    fetching,
    match,
    nsfwMode,
    dataSaverMode
  } = props;
  const subreddit = match.params.subreddit || DEFAULT_SUBREDDIT;
  const listing = match.params.listing || DEFAULT_LISTING_SORT;
  const time = getParam("time") || DEFAULT_TIME_SORT;
  const disableObserver = posts.length === 0 || fetching;

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
            const postComponent = (
              <Post
                key={post.id}
                id={post.id}
                url={post.url}
                thumbnail={post.thumbnail}
                postUrl={post.post_url}
                commentsCount={post.comments_count}
                upvotesCount={post.upvotes_count}
                nsfw={post.nsfw}
                nsfwMode={nsfwMode}
                subreddit={subreddit}
                listing={listing}
                time={time}
                title={post.title}
                dataSaverMode={dataSaverMode}
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
      <Spin paddingTop={1} paddingBottom={1} spinning={fetching} />
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
  withRouter
)(Posts);
