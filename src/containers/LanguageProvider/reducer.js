import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { switchLocale } from './actions';

export const initialState = {
  locale: 'en',
};

const locale = handleActions(
  {
    [switchLocale](state, payload) {
      return payload.locale;
    },
  },
  initialState.locale
);

export default combineReducers({
  locale,
});
