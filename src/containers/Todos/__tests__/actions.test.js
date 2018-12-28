import { FETCH_INVALIDATE, FETCH_REQUESTED } from '../types';
import { fetchInvalidate, fetchRequested, fetchResponse } from '../actions';

describe('Todos Actions', () => {
  describe('fetchInvalidate', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: FETCH_INVALIDATE,
      };

      expect(fetchInvalidate()).toEqual(expectedResult);
    });
  });

  describe('fetchRequested', () => {
    it('should return the correct type and payload', () => {
      const fixture = {
        listId: 4,
      };
      const expectedResult = {
        type: FETCH_REQUESTED,
        payload: fixture,
      };

      expect(fetchRequested(fixture)).toEqual(expectedResult);
    });
  });
});
