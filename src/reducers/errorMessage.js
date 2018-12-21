// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === 'RESET_ERROR_MESSAGE') {
    return null;
  }
  if (error) {
    return error;
  }

  return state;
};

export default errorMessage;
