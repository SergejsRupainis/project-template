import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// import todos from './todos';
import errorMessage from './errorMessage';

export default function createRootReducer(history, asyncReducers) {
  return combineReducers({
    router: connectRouter(history),
    //    todos,
    errorMessage,
    ...asyncReducers,
  });
}
