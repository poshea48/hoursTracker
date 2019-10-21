import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './css/index.css';
import App from './App';
import 'tachyons';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');
let render = () => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    rootElement,
  );
};
if (module.hot) {
  module.hot.accept('./App', () => {
    setTimeout(render);
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
