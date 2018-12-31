import React from 'react';
import PropTypes from 'prop-types';

const LocaleSelector = ({ supportedLocales, locale, onChange }) => (
  <select value={locale} onChange={evt => onChange(evt.target.value)}>
    {supportedLocales.map(item => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>
);

LocaleSelector.propTypes = {
  supportedLocales: PropTypes.arrayOf(PropTypes.string).isRequired,
  locale: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LocaleSelector;
