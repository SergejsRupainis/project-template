/*
 * Todos Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export const yourAction = createAction(YOUR_ACTION_CONSTANT);
 */

import { createAction } from 'redux-actions';

import agent from './agent';
import { FETCH_INVALIDATE, FETCH_REQUESTED, FETCH_RESPONSE } from './types';
import { getTodosState } from './selectors';

export const fetchInvalidate = createAction(FETCH_INVALIDATE);
export const fetchRequested = createAction(FETCH_REQUESTED);
export const fetchResponse = createAction(FETCH_RESPONSE, payload => ({
  ...payload,
  receivedAt: Date.now(),
}));

/**
 * Fetches todos from the external resource
 *
 * @param  {number} listId Identificator of todos list
 * @return {Promise} Promise
 */
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
  const state = getTodosState(globalState);
  if (!state) {
    return false;
  }
  if (state.isFetching) {
    return false;
  }
  if (!state.items) {
    return true;
  }
  return state.didInvalidate;
}

export function fetchTodosIfNeeded(listId) {
  return (dispatch, getState) =>
    shouldFetch(getState()) ? dispatch(fetchTodos(listId)) : Promise.resolve();
}
