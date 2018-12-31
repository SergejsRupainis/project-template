import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { switchLocale, resetLocaleChange } from './actions';

export const initialState = {
  locale: 'en',
  isChangedByAction: false,
};

const locale = handleActions(
  {
    [switchLocale](state, { payload }) {
      return payload;
    },
  },
  initialState.locale
);

const isChangedByAction = handleActions(
  {
    [switchLocale]() {
      return true;
    },
    [resetLocaleChange]() {
      return false;
    },
  },
  initialState.isChangedByAction
);

export default combineReducers({
  locale,
  isChangedByAction,
});
