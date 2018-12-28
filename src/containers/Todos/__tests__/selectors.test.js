import { initialState } from '../reducer';
import { getTodos, makeSelectItems } from '../selectors';

describe('selectTodos', () => {
  it('should select todos state', () => {
    const todosState = { ...initialState };
    const mockedState = {
      todos: todosState,
    };

    expect(getTodos(mockedState)).toEqual(todosState);
  });
});

describe('makeSelectItems', () => {
  const itemsSelector = makeSelectItems();

  it('should select items', () => {
    const items = [{ id: 1, name: 'test' }];
    const todosState = { ...initialState, items };
    const mockedState = {
      todos: todosState,
    };

    expect(itemsSelector(mockedState)).toEqual(items);
  });
});
