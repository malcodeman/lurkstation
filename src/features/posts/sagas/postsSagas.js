import { call, put, takeLatest } from "redux-saga/effects";

import axios from "../../../core/http/axiosInstance";

import {
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POPULAR_SUBS_FAILURE,
  GET_POPULAR_SUBS_REQUEST,
  GET_POPULAR_SUBS_SUCCESS
} from "../actions/postsActionTypes";

const get = subreddit => {
  return axios.get(`/subs/${subreddit}`);
};

const getPopular = () => {
  return axios.get(`/popular`);
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

function* getPopularSubreddits(action) {
  try {
    const data = yield call(getPopular);

    yield put({ type: GET_POPULAR_SUBS_SUCCESS, payload: data.data.subs });
  } catch (error) {
    yield put({ type: GET_POPULAR_SUBS_FAILURE, error });
  }
}

const saga = function*() {
  yield takeLatest(GET_POSTS_REQUEST, getSubreddit);
  yield takeLatest(GET_POPULAR_SUBS_REQUEST, getPopularSubreddits);
};

export default saga;
