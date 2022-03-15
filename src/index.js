import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.less";
import "antd/dist/antd.css";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./theme";
import "./index.css";
import App from "./App";
import ReduxWrapper from "./redux";

ReactDOM.render(
  <ReduxWrapper>
    <ThemeProvider theme={theme}>
      <Router basename="/">
        <App />
      </Router>
    </ThemeProvider>
  </ReduxWrapper>,
  document.getElementById("root")
);
