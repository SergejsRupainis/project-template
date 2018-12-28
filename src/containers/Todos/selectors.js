import { createSelector } from 'reselect';
import { initialState } from './reducer';

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
