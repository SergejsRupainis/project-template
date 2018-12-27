/*
    Use Ducks: https://github.com/erikras/ducks-modular-redux
    Example of async actions: https://redux.js.org/advanced/async-actions
*/

import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { createAction, handleActions } from 'redux-actions';

import todosAgent from './agent';

// #region INITIAL STATE
export const initialState = {
  isFetching: false,
  items: null,
  didInvalidate: false,
};
// #endregion

// #region SELECTORS
export const getTodos = state => state.todos || initialState;

export const makeSelectItems = () =>
  createSelector(
    getTodos,
    todosState => todosState.items || []
  );

export const makeSelectIsFetching = () =>
  createSelector(
    getTodos,
    todosState => todosState.isFetching
  );
// #endregion

// #region ACTIONS
const ACTION_PREPEND = 'todos';

export const fetchInvalidate = createAction(
  `${ACTION_PREPEND}/fetch-invalidate`
);
export const fetchRequested = createAction(`${ACTION_PREPEND}/fetch-requested`);
export const fetchResponse = createAction(
  `${ACTION_PREPEND}/fetch-response`,
  payload => ({ ...payload, receivedAt: Date.now() })
);

export function fetchTodos(listId) {
  return async dispatch => {
    dispatch(fetchRequested({ listId }));

    try {
      const todosList = await todosAgent.getList(listId);
      dispatch(fetchResponse({ listId, items: todosList }));
    } catch (error) {
      dispatch(fetchResponse({ listId, error }));
    }
  };
}

function shouldFetchTodos(state) {
  const todosState = getTodos(state);
  if (!todosState) {
    return false;
  }
  if (!todosState.items) {
    return true;
  }
  if (todosState.isFetching) {
    return false;
  }
  return todosState.didInvalidate;
}

export function fetchTodosIfNeeded(listId) {
  return (dispatch, getState) =>
    shouldFetchTodos(getState())
      ? dispatch(fetchTodos(listId))
      : Promise.resolve();
}
// #endregion

// #region REDUCERS
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
      return payload.items;
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

export default combineReducers({
  isFetching,
  items,
  didInvalidate,
});

// #endregion
