import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// import { loadableReady } from '@loadable/component';
import { Frontload } from 'react-frontload';

import './index.css';
import App from './App';
import history from './utils/history';
import configureStore from './store/configureStore';
import LanguageProvider from './providers/LanguageProvider';

/* eslint-disable no-underscore-dangle */
const initialState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
/* eslint-enable no-underscore-dangle */

const store = configureStore(initialState, history);

/* eslint-disable react/jsx-filename-extension */
const Application = (
  <Provider store={store}>
    <LanguageProvider>
      <ConnectedRouter history={history}>
        <Frontload noServerRender>
          <App />
        </Frontload>
      </ConnectedRouter>
    </LanguageProvider>
  </Provider>
);
/* eslint-enable react/jsx-filename-extension */

const root = document.getElementById('root');

if (process.env.NODE_ENV === 'production') {
  // If we're running in production, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render
  hydrate(Application, root);
  // it seems it doesn't have any use
  // loadableReady(() => {
  //   hydrate(Application, root);
  // });
} else {
  // If we're not running on the server, just render like normal
  render(Application, root);
}
