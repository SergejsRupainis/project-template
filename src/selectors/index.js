import { createSelector } from 'reselect';

export const getSampleTitle = state => state.sample.title;

const getVisibilityFilter = state => state.sample.visibilityFilter;
const getTodos = state => state.sample.todos;

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
