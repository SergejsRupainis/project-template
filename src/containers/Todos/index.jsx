/*
 * Todos page
 *
 * This is the first thing users see of our App, at the '/' route
 * Writing documentation for React components: https://react-styleguidist.js.org/docs/documenting.html
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { frontloadConnect } from 'react-frontload';
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl';

import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import {
  fetchTodosIfNeeded,
  fetchInvalidate as fetchInvalidateAction,
} from './actions';
import {
  makeSelectItems,
  makeSelectIsFetching,
  makeSelectError,
} from './selectors';

import LocaleSelector from '../../components/LocaleSelector';
import withLocaleSwitch from '../LocaleProvider/withLocaleSwitch';

const ConnectedLocaleSelector = withLocaleSwitch(LocaleSelector);
const SomeCheck = injectIntl(props => <div>{JSON.stringify(props)}</div>);
const selectedListId = 1;

/**
 * Root container for todos list. Export clear component for testing purposes
 */
export class Todos extends Component {
  static propTypes = {
    changePage: PropTypes.func.isRequired,
    /** List of todos */
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchTodos: PropTypes.func.isRequired,
    fetchInvalidate: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    title: PropTypes.string,
    lastUpdated: PropTypes.number,
    error: PropTypes.string,
  };

  static defaultProps = {
    title: 'Dummy title',
    lastUpdated: Date.now(),
    error: '',
  };

  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  // componentDidMount() {
  //   const { fetchTodos } = this.props;
  //   fetchTodos(selectedListId);
  // }

  componentDidUpdate() {
    // https://redux.js.org/advanced/example-reddit-api
    // if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
    //   const { dispatch, selectedSubreddit } = this.props
    //   dispatch(fetchPostsIfNeeded(selectedSubreddit))
    // }
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { fetchTodos, fetchInvalidate } = this.props;
    fetchInvalidate(selectedListId);
    fetchTodos(selectedListId);
  }

  render() {
    const {
      title,
      changePage,
      todos,
      lastUpdated,
      isFetching,
      error,
    } = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <h2>
          <FormattedMessage id="home.hello" />
        </h2>
        {isFetching && todos.length === 0 && <h2>Loading...</h2>}
        {isFetching && <h2>Still loading...</h2>}
        {!isFetching && todos.length === 0 && <h2>Empty.</h2>}
        {todos.length > 0 && <code>{JSON.stringify(todos)}</code>}
        {lastUpdated && (
          <div>
            Last updated at <FormattedDate value={new Date(lastUpdated)} />
          </div>
        )}
        {error && <div>{`Error message: ${error}`}</div>}
        {!isFetching && (
          <button type="button" onClick={this.handleRefreshClick}>
            Refresh
          </button>
        )}
        <button type="button" onClick={() => changePage()}>
          Go to about page via redux
        </button>
        <div>
          <ConnectedLocaleSelector />
          <SomeCheck />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  todos: makeSelectItems(),
  isFetching: makeSelectIsFetching(),
  error: makeSelectError(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push('/about-us'),
      fetchTodos: fetchTodosIfNeeded,
      fetchInvalidate: fetchInvalidateAction,
    },
    dispatch
  );

const frontload = async props => props.fetchTodos(selectedListId);

const FrontloadTodos = frontloadConnect(frontload, {
  onMount: true,
  onUpdate: false,
})(Todos);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

// You can add multiple reducers if you want - https://stackoverflow.com/questions/49988229/dynamically-load-redux-reducers-with-react-router-4
const todosReducer = injectReducer({
  key: 'todos',
  reducer,
});

export default compose(
  todosReducer,
  withConnect
)(FrontloadTodos);
