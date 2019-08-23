import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(sagaMiddleware)
);

store.subscribe(() => {
  saveState({ settings: store.getState().settings });
});

sagaMiddleware.run(rootSaga);

export default store;
