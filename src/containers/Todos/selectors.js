import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const getTodosState = state => state.todos || initialState;

export const makeSelectItems = () =>
  createSelector(
    getTodosState,
    todosState => todosState.items || []
  );

export const makeSelectIsFetching = () =>
  createSelector(
    getTodosState,
    todosState => todosState.isFetching
  );

export const makeSelectError = () =>
  createSelector(
    getTodosState,
    todosState => todosState.error
  );
