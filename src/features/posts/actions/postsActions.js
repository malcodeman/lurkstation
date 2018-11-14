import {
  GET_POSTS_REQUEST,
  GET_POPULAR_SUBS_REQUEST
} from "./postsActionTypes";

export const getPosts = (payload, meta) => {
  return {
    payload,
    meta,
    type: GET_POSTS_REQUEST
  };
};

export const getPopularSubs = () => {
  return {
    type: GET_POPULAR_SUBS_REQUEST
  };
};
