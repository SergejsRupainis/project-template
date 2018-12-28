import { createAction } from 'redux-actions';

import agent from './agent';
import { FETCH_INVALIDATE, FETCH_REQUESTED, FETCH_RESPONSE } from './types';
import { getTodos } from './selectors';

export const fetchInvalidate = createAction(FETCH_INVALIDATE);
export const fetchRequested = createAction(FETCH_REQUESTED);
export const fetchResponse = createAction(FETCH_RESPONSE, payload => ({
  ...payload,
  receivedAt: Date.now(),
}));

export function fetchTodos(listId) {
  return async dispatch => {
    dispatch(fetchRequested({ listId }));

    try {
      const items = await agent.getList(listId);
      dispatch(fetchResponse({ listId, items }));
    } catch (error) {
      dispatch(fetchResponse(error));
    }
  };
}

export function shouldFetch(globalState) {
  const state = getTodos(globalState);
  if (!state) {
    return false;
  }
  if (!state.items) {
    return true;
  }
  if (state.isFetching) {
    return false;
  }
  return state.didInvalidate;
}

export function fetchTodosIfNeeded(listId) {
  return (dispatch, getState) =>
    shouldFetch(getState()) ? dispatch(fetchTodos(listId)) : Promise.resolve();
}
