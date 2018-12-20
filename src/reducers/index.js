import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import sample from './sample';

export default history =>
  combineReducers({
    router: connectRouter(history),
    sample,
  });
