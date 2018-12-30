import { createAction } from 'redux-actions';
import { SWITCH_LOCALE } from './types';

export const switchLocale = createAction(SWITCH_LOCALE);
export default switchLocale;
