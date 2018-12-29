import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../utils/history';
import errorMessageReducer from './errorMessage';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 * Creates dummy reducers if initial state has values without approriate reducer
 * Inspired by https://medium.com/front-end-weekly/code-splitting-redux-reducers-4073db30c72e
 */
export default function createReducer(
  injectedReducers = {},
  initialState = {}
) {
  const reducers = {
    router: connectRouter(history),
    errorMessage: errorMessageReducer,
    ...injectedReducers,
  };

  const reducerKeys = new Set(Object.keys(reducers));

  Object.keys(initialState)
    .filter(k => !reducerKeys.has(k))
    .forEach(k => {
      reducers[k] = state => (state === undefined ? null : state);
    });

  return combineReducers(reducers);
}

// export default function createReducer(injectedReducers = {}) {
//   return combineReducers({
//     router: connectRouter(history),
//     errorMessage: errorMessageReducer,
//     ...injectedReducers,
//   });
// }
