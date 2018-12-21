import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import todos from './todos';
import errorMessage from './errorMessage';

export default history =>
  combineReducers({
    router: connectRouter(history),
    todos,
    errorMessage,
  });
