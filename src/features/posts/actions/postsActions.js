import {
  GET_POSTS_REQUEST,
  GET_POPULAR_SUBS_REQUEST,
  SEARCH_POSTS_REQUEST
} from "./postsActionTypes";

export const getPosts = (subreddit, after) => {
  return {
    payload: { subreddit, after },
    type: GET_POSTS_REQUEST
  };
};

export const getPopularSubs = () => {
  return {
    type: GET_POPULAR_SUBS_REQUEST
  };
};

export const searchPosts = (payload, meta) => {
  return {
    payload,
    meta,
    type: SEARCH_POSTS_REQUEST
  };
};
