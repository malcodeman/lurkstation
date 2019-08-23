import { combineReducers } from "redux";

import posts from "../../features/posts/reducers/postsReducers";
import settings from "../../features/settings/reducers/settingsReducers";

const rootReducer = combineReducers({
  posts,
  settings
});

export default rootReducer;
