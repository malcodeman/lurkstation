import {
  TOGGLE_DARK_MODE,
  TOGGLE_DATA_SAVER_MODE,
  TOGGLE_NSFW_MODE
} from "./settingsActionTypes";

export const toggleDarkMode = payload => {
  return {
    payload,
    type: TOGGLE_DARK_MODE
  };
};

export const toggleDataSaverMode = payload => {
  return {
    payload,
    type: TOGGLE_DATA_SAVER_MODE
  };
};

export const toggleNsfwMode = payload => {
  return {
    payload,
    type: TOGGLE_NSFW_MODE
  };
};
