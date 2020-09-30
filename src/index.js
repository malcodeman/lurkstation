import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./core/state/store";
import App from "./App";
import GlobalStyle from "./core/style/GlobalStyle";

const MOUNT_NODE = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
    <GlobalStyle />
  </Provider>,
  MOUNT_NODE
);
