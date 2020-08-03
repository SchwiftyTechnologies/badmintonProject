import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Main from "./components/routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

export { store };

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
