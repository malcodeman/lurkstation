import {
  GET_POSTS_SUCCESS,
  GET_POPULAR_SUBS_SUCCESS
} from "../actions/postsActionTypes";

const initialState = {
  posts: null,
  popularSubs: null
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload
      };
    case GET_POPULAR_SUBS_SUCCESS:
      return {
        ...state,
        popularSubs: action.payload
      };
    default:
      return state;
  }
};
