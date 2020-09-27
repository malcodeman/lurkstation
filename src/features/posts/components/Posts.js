import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { useTheme } from "styled-components";
import { useRouteMatch } from "react-router-dom";
import Observer from "@researchgate/react-intersection-observer";

import { searchPosts, getPosts } from "../actions/postsActions";
import { getParam } from "../../../core/utils";
import { useScrollToTop, useWindowSize } from "../../../core/hooks";
import {
  DEFAULT_SUBREDDIT,
  DEFAULT_LISTING_SORT,
  DEFAULT_TIME_SORT,
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

function Posts() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const match = useRouteMatch();
  const posts = useSelector((state) => state.posts.posts);
  const fetching = useSelector((state) => state.posts.fetching);
  const after = useSelector((state) => state.posts.after);
  const nsfwMode = useSelector((state) => state.settings.nsfwMode);
  const dataSaverMode = useSelector((state) => state.settings.dataSaverMode);
  const subreddit = match.params.subreddit || DEFAULT_SUBREDDIT;
  const listing = match.params.listing || DEFAULT_LISTING_SORT;
  const time = getParam("time") || DEFAULT_TIME_SORT;
  const disableObserver = posts.length === 0 || fetching;
  const { width } = useWindowSize();

  useScrollToTop(subreddit, listing, time);

  useEffect(() => {
    dispatch(searchPosts(subreddit, listing, time));
  }, [subreddit, listing, time, dispatch]);

  function handleIntersecting({ isIntersecting }) {
    if (isIntersecting) {
      dispatch(getPosts(subreddit, listing, time, after));
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
                  title={post.title}
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

export default Posts;
