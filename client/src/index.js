import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./css/index.css";
import App from "./App";
import "tachyons";
import * as serviceWorker from "./serviceWorker";

const rootElement = document.getElementById("root");
let render = () => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    rootElement
  );
};
if (module.hot) {
  module.hot.accept("./App", () => {
    setTimeout(render);
  });
}

render();

serviceWorker.unregister();
