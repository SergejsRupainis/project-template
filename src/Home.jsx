import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Home = ({ title, changePage }) => (
  <div>
    <h1>{title}</h1>
    <p>Welcome home!</p>
    <button type="button" onClick={() => changePage()}>
      Go to about page via redux
    </button>
  </div>
);

Home.propTypes = {
  changePage: PropTypes.func.isRequired,
  title: PropTypes.string,
};

Home.defaultProps = {
  title: '',
};

const mapStateToProps = state => ({
  title: state.sample.title,
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
