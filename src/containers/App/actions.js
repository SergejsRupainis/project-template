import { createAction } from 'redux-actions';

import { getAppState } from './selectors';
import { FETCH_USER_INFO_REQUESTED, FETCH_USER_INFO_RESPONSE } from './types';
import agent from './agent';

export const fetchUserInfoRequested = createAction(FETCH_USER_INFO_REQUESTED);
export const fetchUserInfoResponse = createAction(
  FETCH_USER_INFO_RESPONSE,
  payload => ({
    ...payload,
    receivedAt: Date.now(),
  })
);

const parseUserInfo = ({ attribute }) =>
  attribute.reduce((map, { name, values: { value } }) => {
    map[name] = value.length === 1 ? value[0] : value; // eslint-disable-line no-param-reassign
    return map;
  }, {});

/**
 * Fetches user info from external resource
 *
 * @return {Promise} Promise
 */
export function fetchUserInfo() {
  return async dispatch => {
    dispatch(fetchUserInfoRequested());

    try {
      const rawUser = await agent.getUserInfo(1);
      const user = parseUserInfo(rawUser);
      return dispatch(fetchUserInfoResponse({ user }));
    } catch (error) {
      return dispatch(fetchUserInfoResponse(error));
    }
  };
}

export function shouldFetchUserInfo(globalState) {
  const state = getAppState(globalState);
  if (!state) {
    return false;
  }
  if (state.isUserInfoFetching) {
    return false;
  }
  if (!state.user) {
    return true;
  }
  return false;
}

export function fetchUserInfoIfNeeded() {
  return (dispatch, getState) =>
    shouldFetchUserInfo(getState())
      ? dispatch(fetchUserInfo())
      : Promise.resolve();
}
