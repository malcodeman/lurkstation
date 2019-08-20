import {
  GET_POSTS_SUCCESS,
  GET_POPULAR_SUBS_SUCCESS,
  GET_POSTS_REQUEST,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS
} from "../actions/postsActionTypes";

const initialState = {
  posts: [],
  popularSubs: null,
  fetching: false,
  after: null
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        after: action.payload.after,
        fetching: false
      };
    case SEARCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        after: action.payload.after,
        fetching: false
      };
    case GET_POPULAR_SUBS_SUCCESS:
      return {
        ...state,
        popularSubs: action.payload
      };
    case SEARCH_POSTS_REQUEST:
      return {
        ...state,
        fetching: true,
        subreddit: action.payload.subreddit
      };
    case GET_POSTS_REQUEST:
      return {
        ...state,
        fetching: true,
        subreddit: action.payload.subreddit
      };
    default:
      return state;
  }
};
