import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';

import createReducer from '../reducers';

export default function configureStore(initialState = {}, history) {
  const middleware = [thunkMiddleware, routerMiddleware(history)];
  const enhancers = [];

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  const store = createStore(createReducer(), initialState, composedEnhancers);

  store.injectedReducers = {};

  return store;
}
