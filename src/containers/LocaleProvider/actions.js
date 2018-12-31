import { createAction } from 'redux-actions';
import { SWITCH_LOCALE, RESET_LOCALE_CHANGE } from './types';

export const switchLocale = createAction(SWITCH_LOCALE);
export const resetLocaleChange = createAction(RESET_LOCALE_CHANGE);
