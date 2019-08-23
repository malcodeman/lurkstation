import {
  TOGGLE_DARK_MODE,
  TOGGLE_NSFW_MODE
} from "../actions/settingsActionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload
      };
    case TOGGLE_NSFW_MODE:
      return {
        ...state,
        nsfwMode: action.payload
      };
    default:
      return state;
  }
};
