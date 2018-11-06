import { call, put, takeLatest } from "redux-saga/effects";

import axios from "../../../core/http/axiosInstance";

import {
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS
} from "../actions/postsActionTypes";

const get = subreddit => {
  return axios.get(`/subs/${subreddit}`);
};

function* getSubreddit(action) {
  const { setSubmitting } = action.meta;
  try {
    const { subreddit } = action.payload;
    const data = yield call(get, subreddit);

    yield put({ type: GET_POSTS_SUCCESS, payload: data.data.posts });
    setSubmitting(false);
  } catch (error) {
    yield put({ type: GET_POSTS_FAILURE, error });
    setSubmitting(false);
  }
}

const saga = function*() {
  yield takeLatest(GET_POSTS_REQUEST, getSubreddit);
};

export default saga;
