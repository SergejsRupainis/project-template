import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  background-color: yellowgreen;
  font-size: 2em;
`;

const ErrorPage = ({ errorCode }) => (
  <ErrorContainer>
    <FormattedMessage
      id={`error.${errorCode}`}
      defaultMessage="I don't know this error"
    />
  </ErrorContainer>
);

ErrorPage.propTypes = {
  errorCode: PropTypes.number.isRequired,
};

export default ErrorPage;
