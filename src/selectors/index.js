import { createSelector } from 'reselect';

export const getTodosTitle = state => (state.todos ? state.todos.title : '');

const getVisibilityFilter = state =>
  state.todos ? state.todos.visibilityFilter : 'SHOW_ALL';

const getTodos = state => (state.todos ? state.todos.items || [] : []);

export const getTodosIsFetching = state =>
  state.todos ? state.todos.isFetching : false;

export const getTodosLastUpdatedDate = state =>
  state.todos ? state.todos.lastUpdated : 0;

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
      case 'SHOW_ALL':
      default:
        return todos;
    }
  }
);
