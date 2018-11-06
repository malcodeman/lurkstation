import React, { Component } from "react";
import { ThemeProvider } from "styled-components";

import Home from "./features/homepage/components/Homepage";
import imgurTheme from "./core/style/themes/imgur";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={imgurTheme}>
        <Home />
      </ThemeProvider>
    );
  }
}

export default App;
