import { combineReducers } from "redux";

import posts from "../../features/posts/reducers/postsReducers";

const rootReducer = combineReducers({
  posts
});

export default rootReducer;
