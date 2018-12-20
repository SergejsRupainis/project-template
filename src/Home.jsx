import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getSampleTitle, getVisibleTodos } from './selectors';

const Home = ({ title, changePage, todos }) => (
  <div>
    <h1>{title}</h1>
    <code>{JSON.stringify(todos)}</code>
    <button type="button" onClick={() => changePage()}>
      Go to about page via redux
    </button>
  </div>
);

Home.propTypes = {
  changePage: PropTypes.func.isRequired,
  title: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Home.defaultProps = {
  title: '',
};

const mapStateToProps = state => ({
  title: getSampleTitle(state),
  todos: getVisibleTodos(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push('/about-us'),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
