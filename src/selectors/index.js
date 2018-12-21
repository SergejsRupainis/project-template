import { createSelector } from 'reselect';

export const getTodosTitle = state => state.todos.title;

const getVisibilityFilter = state => state.todos.visibilityFilter;
const getTodos = state => state.todos.items || [];
export const getTodosIsFetching = state => state.todos.isFetching;
export const getTodosLastUpdatedDate = state => state.todos.lastUpdated;

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
