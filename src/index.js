import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Router, Route } from "react-router-dom";

import store from "./core/state/store";
import theme from "./core/style/theme";
import history from "./core/routing/history";
import Home from "./features/home/components/Home";
import GlobalStyles from "./core/style/GlobalStyles";

const MOUNT_NODE = document.getElementById("root");

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme.dark}>
        <>
          <Router history={history}>
            <Route exact path="/" component={Home} />
          </Router>
          <GlobalStyles />
        </>
      </ThemeProvider>
    </Provider>,
    MOUNT_NODE
  );
}

render();
