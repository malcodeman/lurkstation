import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Router, Route } from "react-router-dom";

import theme from "./core/style/theme";
import history from "./core/routing/history";
import Home from "./features/home/components/Home";

function App() {
  const darkMode = useSelector((state) => state.settings.darkMode);

  return (
    <ThemeProvider theme={darkMode ? theme.dark : theme.light}>
      <Router history={history}>
        <Route
          exact
          path={[
            "/",
            "/:subreddit",
            "/:subreddit/:listing",
            "/:subreddit/:listing/:postId",
          ]}
          component={Home}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
