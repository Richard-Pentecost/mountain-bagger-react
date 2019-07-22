import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './style/normalize.scss';
import 'simplebar/dist/simplebar.min.css';
import './style/index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

render(
  (
    <Router>
      <App />
    </Router>
  ), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
