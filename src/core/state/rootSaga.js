import { all, fork } from "redux-saga/effects";

import postsSaga from "../../features/posts/sagas/postsSagas";

export default function* rootSaga() {
  yield all([fork(postsSaga)]);
}
