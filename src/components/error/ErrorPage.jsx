import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const ErrorPage = ({ errorCode }) => (
  <div>
    <FormattedMessage
      id={`error.${errorCode}`}
      defaultMessage="I don't know this error"
    />
  </div>
);

ErrorPage.propTypes = {
  errorCode: PropTypes.number.isRequired,
};

export default ErrorPage;
