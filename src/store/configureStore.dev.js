import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';

import createReducer from '../reducers';

export default function configureStore(initialState = {}, history) {
  const middleware = [thunkMiddleware, routerMiddleware(history)];
  const enhancers = [];

  if (typeof window === 'object') {
    /* eslint-disable-next-line no-underscore-dangle */
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  const store = createStore(
    createReducer({}, initialState),
    initialState,
    composedEnhancers
  );

  store.injectedReducers = {};

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(
        createReducer(store.injectedReducers, store.getState())
      );
    });
  }

  return store;
}
