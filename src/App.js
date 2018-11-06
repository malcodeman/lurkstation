import React, { Component } from "react";
import { ThemeProvider } from "styled-components";

import Posts from "./features/posts/containers/Posts";
import defaultTheme from "./core/style/themes/default";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Posts />
      </ThemeProvider>
    );
  }
}

export default App;
