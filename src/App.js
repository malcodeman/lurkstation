import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Router, Route } from "react-router-dom";

import theme from "./core/style/theme";
import history from "./core/routing/history";
import Home from "./features/home/components/Home";

function App(props) {
  const { darkMode } = props;

  return (
    <ThemeProvider theme={darkMode ? theme.dark : theme.light}>
      <Router history={history}>
        <Route
          exact
          path={[
            "/",
            "/:subreddit",
            "/:subreddit/:listing",
            "/:subreddit/:listing/:postId"
          ]}
          component={Home}
        />
      </Router>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return {
    darkMode: state.settings.darkMode
  };
};

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(App);
