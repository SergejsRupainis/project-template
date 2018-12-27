import { createAction } from 'redux-actions';

const ACTION_PREPEND = 'error';

export const resetErrorMessage = createAction(
  `${ACTION_PREPEND}/reset-error-message`
);

// Updates error message to notify about the failed fetches.
export default function reducer(state = null, action) {
  const { type, error, payload } = action;

  if (type === resetErrorMessage) {
    return null;
  }
  if (error) {
    return payload.message;
  }

  return state;
}
