import { GET_POSTS_REQUEST } from "./postsActionTypes";

export const getPosts = (payload, meta) => {
  return {
    payload,
    meta,
    type: GET_POSTS_REQUEST
  };
};
