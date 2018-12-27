import todosAgent from '../agent/todos';

// reducer
const initialState = {
  title: 'bac',
  visibilityFilter: 'SHOW_ALL',
  isFetching: false,
  didInvalidate: false,
  items: null,
};

export const todos = function todos(state = initialState, action) {
  switch (action.type) {
    case 'INVALIDATE_TODOS_LIST':
      return {
        ...state,
        didInvalidate: true,
      };
    case 'TODOS_REQUEST':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case 'TODOS_RECEIVE':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.todosList,
        lastUpdated: action.receivedAt,
      };
    case 'TODOS_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

// actions
// example of async actions: https://redux.js.org/advanced/async-actions
export function invalidateList(listId) {
  return {
    type: 'INVALIDATE_TODOS_LIST',
    listId,
  };
}

export const requestTodos = listId => ({
  type: 'TODOS_REQUEST',
  listId,
});

export const receiveTodos = (listId, todosList) => ({
  type: 'TODOS_RECEIVE',
  listId,
  todosList,
  receivedAt: Date.now(),
});

export const receiveTodosError = (listId, error) => ({
  type: 'TODOS_ERROR',
  error,
});

export function fetchTodos(listId) {
  return async dispatch => {
    dispatch(requestTodos(listId));

    try {
      const todosList = await todosAgent.getList(listId);
      dispatch(receiveTodos(listId, todosList));
    } catch (error) {
      dispatch(receiveTodosError(listId, error));
    }
  };
}

function shouldFetchTodos(state) {
  const todosState = state.todos;
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
