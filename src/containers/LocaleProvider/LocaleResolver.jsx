import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { frontloadConnect } from 'react-frontload';

import { SUPPORTED_LOCALES } from '../../config';

import { makeSelectLocale, makeSelectIsChangedByAction } from './selectors';
import * as actions from './actions';

const LocaleResolver = () => null;

LocaleResolver.propTypes = {
  locale: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  defaultPage: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  isChangedByAction: makeSelectIsChangedByAction(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const frontload = async props => {
  let { locale } = props;
  const {
    switchLocale,
    resetLocaleChange,
    isChangedByAction,
    defaultPage,
    history,
    location,
  } = props;
  const { locale: pathLocale } = props.match.params;

  if (
    !isChangedByAction &&
    pathLocale &&
    locale !== pathLocale &&
    SUPPORTED_LOCALES.has(pathLocale)
  ) {
    switchLocale(pathLocale);
    locale = pathLocale;
  }

  if (!pathLocale) {
    history.replace(`/${locale}/${defaultPage}`);
  }

  if (isChangedByAction) {
    const currentPath = location.pathname.split(`/${pathLocale}/`)[1] || '';
    history.push(`/${locale}/${currentPath}`);
    resetLocaleChange();
  }
};

const FrontloadLocaleResolver = frontloadConnect(frontload, {
  onMount: true,
  onUpdate: true,
})(LocaleResolver);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontloadLocaleResolver);
