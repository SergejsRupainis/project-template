import todosReducer, { initialState } from '../reducer';
import { fetchInvalidate, fetchRequested, fetchResponse } from '../actions';

describe('todosReducer', () => {
  let state;
  beforeEach(() => {
    state = { ...initialState };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(todosReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle fetchInvalidate', () => {
    const expectedResult = { ...state, didInvalidate: true };

    expect(todosReducer(state, fetchInvalidate())).toEqual(expectedResult);
  });

  it('should handle fetchRequested', () => {
    const expectedResult = { ...state, didInvalidate: false, isFetching: true };
    const listId = 5;

    expect(todosReducer(state, fetchRequested({ listId }))).toEqual(
      expectedResult
    );
  });

  it('should handle fetchResponse', () => {
    const listId = 5;
    const items = [{ id: 1, name: 'test' }];

    const expectedResult = {
      ...state,
      didInvalidate: false,
      isFetching: false,
      items,
    };

    expect(todosReducer(state, fetchResponse({ listId, items }))).toEqual(
      expectedResult
    );
  });
});
