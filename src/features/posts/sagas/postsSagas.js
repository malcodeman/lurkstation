import { call, put, takeLatest } from "redux-saga/effects";

import axios from "../../../core/http/axiosInstance";

import {
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POPULAR_SUBS_FAILURE,
  GET_POPULAR_SUBS_REQUEST,
  GET_POPULAR_SUBS_SUCCESS,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAILURE
} from "../actions/postsActionTypes";

const get = (subreddit, sort, time, after) => {
  if (time) {
    if (after) {
      return axios.get(
        `/subs/${subreddit}/${sort}?after=${after}&time=${time}`
      );
    }
    return axios.get(`/subs/${subreddit}/${sort}?time=${time}`);
  }
  if (after) {
    return axios.get(`/subs/${subreddit}/${sort}?after=${after}`);
  }
  return axios.get(`/subs/${subreddit}/${sort}`);
};

const getPopular = () => {
  return axios.get(`/popular`);
};

function* getSubreddit(action) {
  try {
    const { subreddit, sort, time } = action.payload;
    let { after } = action.payload;

    const data = yield call(get, subreddit, sort, time, after);
    const posts = data.data.posts.parsed;
    after = data.data.after;
    yield put({ type: GET_POSTS_SUCCESS, payload: { posts, after } });
  } catch (error) {
    yield put({ type: GET_POSTS_FAILURE, error });
  }
}

function* searchSubreddit(action) {
  try {
    const { subreddit, sort, time } = action.payload;
    const data = yield call(get, subreddit, sort, time, null);
    const posts = data.data.posts.parsed;
    const after = data.data.after;
    yield put({ type: SEARCH_POSTS_SUCCESS, payload: { posts, after } });
    if (action.meta && action.meta.setSubmitting) {
      action.meta.setSubmitting(false);
    }
  } catch (error) {
    yield put({ type: SEARCH_POSTS_FAILURE, error });
    if (action.meta && action.meta.setSubmitting) {
      action.meta.setSubmitting(false);
    }
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
  yield takeLatest(SEARCH_POSTS_REQUEST, searchSubreddit);
};

export default saga;
