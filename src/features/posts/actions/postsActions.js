import {
  GET_POSTS_REQUEST,
  GET_POPULAR_SUBS_REQUEST,
  SEARCH_POSTS_REQUEST,
  CHANGE_FILTER
} from "./postsActionTypes";

export const getPosts = (subreddit, sort, time, after) => {
  return {
    payload: { subreddit, sort, time, after },
    type: GET_POSTS_REQUEST
  };
};

export const getPopularSubs = () => {
  return {
    type: GET_POPULAR_SUBS_REQUEST
  };
};

export const searchPosts = (subreddit, sort, time, setSubmitting) => {
  return {
    payload: { subreddit, sort, time },
    meta: { setSubmitting },
    type: SEARCH_POSTS_REQUEST
  };
};

export const changeFilter = (subreddit, sort, time, after) => {
  return {
    payload: { subreddit, sort, time, after },
    type: CHANGE_FILTER
  };
};
