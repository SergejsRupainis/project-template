import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const getLocaleState = state => state.locale || initialState;

export const makeSelectLocale = () =>
  createSelector(
    getLocaleState,
    localeState => localeState.locale
  );

export const makeSelectIsChangedByAction = () =>
  createSelector(
    getLocaleState,
    localeState => localeState.isChangedByAction
  );
