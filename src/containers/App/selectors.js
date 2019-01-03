import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const getAppState = state => state.app || initialState;

export const makeSelectUser = () =>
  createSelector(
    getAppState,
    appState => appState.user
  );

export const makeSelectSessionRequiresChecking = () =>
  createSelector(
    getAppState,
    appState => appState.user === null && appState.errorStatus === null
  );
