import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import thunkMiddleware from 'redux-thunk';

import createRootReducer from '../reducers';
import packageJson from '../../package.json';

export const history = createHistory({ basename: packageJson.homepage });

const enhancers = [];
const middleware = [thunkMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable no-underscore-dangle */
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  /* eslint-enable no-underscore-dangle */

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export const configureStore = preloadedState => {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composedEnhancers
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
};
