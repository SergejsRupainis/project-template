/*
    Use Ducks: https://github.com/erikras/ducks-modular-redux
    Example of async actions: https://redux.js.org/advanced/async-actions
*/

import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { createAction, handleActions } from 'redux-actions';

import agent from './agent';

// #region INITIAL STATE
export const initialState = {
  isFetching: false,
  items: null,
  didInvalidate: false,
  error: null,
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

export const makeSelectError = () =>
  createSelector(
    getTodos,
    todosState => todosState.error
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
      const items = await agent.getList(listId);
      dispatch(fetchResponse({ listId, items }));
    } catch (error) {
      dispatch(fetchResponse(error));
    }
  };
}

function shouldFetch(globalState) {
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

// #endregion
