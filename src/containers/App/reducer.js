import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { fetchUserInfoRequested, fetchUserInfoResponse } from './actions';

export const initialState = {
  isUserInfoFetching: false,
  user: null,
  errorStatus: null,
};

const user = handleActions(
  {
    [fetchUserInfoRequested](state) {
      return state;
    },
    [fetchUserInfoResponse](state, { payload }) {
      return payload.user ? payload.user : state;
    },
  },
  initialState.user
);

const errorStatus = handleActions(
  {
    [fetchUserInfoResponse]: {
      next() {
        return null;
      },
      throw(
        state,
        {
          payload: { status },
        }
      ) {
        return status;
      },
    },
  },
  initialState.errorStatus
);

const isUserInfoFetching = handleActions(
  {
    [fetchUserInfoRequested]() {
      return true;
    },
    [fetchUserInfoResponse]() {
      return false;
    },
  },
  initialState.isUserInfoFetching
);

export default combineReducers({
  user,
  errorStatus,
  isUserInfoFetching,
});
