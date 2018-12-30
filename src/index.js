import React from 'react';
import { render, hydrate, unmountComponentAtNode } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// import { loadableReady } from '@loadable/component';
import { Frontload } from 'react-frontload';
import { setupLocalization, translationMessages } from 'utils/i18n';
import history from 'utils/history';

import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import LanguageProvider from './containers/LanguageProvider';

/* eslint-disable no-underscore-dangle */
const initialState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
/* eslint-enable no-underscore-dangle */

const store = configureStore(initialState, history);

/* eslint-disable react/jsx-filename-extension */
const renderApplication = messages => {
  const Application = (
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <Frontload noServerRender>
            <App />
          </Frontload>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>
  );
  const root = document.getElementById('root');

  if (process.env.NODE_ENV === 'production') {
    // If we're running in production, we use hydrate to get fast page loads by just
    // attaching event listeners after the initial render
    hydrate(Application, root);
  } else {
    // If we're not running on the server, just render like normal
    render(Application, root);
  }
};
/* eslint-enable react/jsx-filename-extension */

setupLocalization().then(() => {
  renderApplication(translationMessages);
});

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['utils/i18n', './App'], () => {
    const root = document.getElementById('root');
    unmountComponentAtNode(root);
    renderApplication(translationMessages);
  });
}
