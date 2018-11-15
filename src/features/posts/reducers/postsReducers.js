import {
  GET_POSTS_SUCCESS,
  GET_POPULAR_SUBS_SUCCESS,
  GET_POSTS_REQUEST,
  SEARCH_POSTS_REQUEST
} from "../actions/postsActionTypes";

const initialState = {
  posts: null,
  popularSubs: null,
  fetching: false
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
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
        fetching: true
      };
    case GET_POSTS_REQUEST:
      return {
        ...state,
        fetching: true
      };
    default:
      return state;
  }
};
