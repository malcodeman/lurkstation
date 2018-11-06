import { GET_POSTS_SUCCESS } from "../actions/postsActionTypes";

const initialState = {
  posts: null
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
};
