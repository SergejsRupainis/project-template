import React from 'react';
import PropTypes from 'prop-types';
import { Link as ReactDomLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';

const Link = props => {
  const Component = injectIntl(({ intl: { locale } }) => (
    <ReactDomLink {...props} to={`/${locale}/${props.to.replace(/^\//, '')}`} />
  ));

  return <Component />;
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
};

export default Link;
