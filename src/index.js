import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";
import middleware from "./middleware";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <ThemeProvider>
    <CSSReset />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
