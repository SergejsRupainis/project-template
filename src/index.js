import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import './index.css';
import App from './App';
import history from './utils/history';
import configureStore from './store/configureStore';

const initialState = {};
const store = configureStore(initialState, history);

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
/* eslint-enable react/jsx-filename-extension */
