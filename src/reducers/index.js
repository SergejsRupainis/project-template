import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../utils/history';
import errorMessageReducer from './errorMessage';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    router: connectRouter(history),
    errorMessage: errorMessageReducer,
    ...injectedReducers,
  });
}
