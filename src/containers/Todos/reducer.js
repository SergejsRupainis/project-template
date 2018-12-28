import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { fetchInvalidate, fetchRequested, fetchResponse } from './actions';

export const initialState = {
  isFetching: false,
  items: null,
  didInvalidate: false,
  error: null,
};

const isFetching = handleActions(
  {
    [fetchRequested]() {
      return true;
    },
    [fetchResponse]() {
      return false;
    },
  },
  initialState.isFetching
);

const items = handleActions(
  {
    [fetchRequested](state) {
      return state;
    },
    [fetchResponse](state, { payload }) {
      return payload.items ? payload.items : state;
    },
  },
  initialState.items
);

const didInvalidate = handleActions(
  {
    [fetchInvalidate]() {
      return true;
    },
    [fetchRequested]() {
      return false;
    },
    [fetchResponse]() {
      return false;
    },
  },
  initialState.didInvalidate
);

const error = handleActions(
  {
    [fetchResponse]: {
      next() {
        return null;
      },
      throw(
        state,
        {
          payload: { message },
        }
      ) {
        return message;
      },
    },
  },
  initialState.error
);

export default combineReducers({
  isFetching,
  items,
  didInvalidate,
  error,
});
