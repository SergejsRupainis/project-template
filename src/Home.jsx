import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  getTodosTitle,
  getVisibleTodos,
  getTodosIsFetching,
  getTodosLastUpdatedDate,
} from './selectors';
import {
  invalidateList as invalidateListAction,
  fetchTodosIfNeeded as fetchTodosIfNeededAction,
} from './reducers/todos';

const selectedListId = 2;

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { fetchTodosIfNeeded } = this.props;
    fetchTodosIfNeeded(selectedListId);
  }

  componentDidUpdate() {
    // https://redux.js.org/advanced/example-reddit-api
    // if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
    //   const { dispatch, selectedSubreddit } = this.props
    //   dispatch(fetchPostsIfNeeded(selectedSubreddit))
    // }
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { fetchTodosIfNeeded, invalidateList } = this.props;
    invalidateList(selectedListId);
    fetchTodosIfNeeded(selectedListId);
  }

  render() {
    const { title, changePage, todos, lastUpdated, isFetching } = this.props;

    return (
      <div>
        <h1>{title}</h1>
        {isFetching && todos.length === 0 && <h2>Loading...</h2>}
        {!isFetching && todos.length === 0 && <h2>Empty.</h2>}
        {todos.length > 0 && <code>{JSON.stringify(todos)}</code>}
        {lastUpdated && (
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
          </span>
        )}
        {!isFetching && (
          <button type="button" onClick={this.handleRefreshClick}>
            Refresh
          </button>
        )}
        <button type="button" onClick={() => changePage()}>
          Go to about page via redux
        </button>
      </div>
    );
  }
}

Home.propTypes = {
  changePage: PropTypes.func.isRequired,
  title: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTodosIfNeeded: PropTypes.func.isRequired,
  invalidateList: PropTypes.func.isRequired,
  lastUpdated: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
};

Home.defaultProps = {
  title: '',
  lastUpdated: 0,
};

const mapStateToProps = state => ({
  title: getTodosTitle(state),
  todos: getVisibleTodos(state),
  lastUpdated: getTodosLastUpdatedDate(state),
  isFetching: getTodosIsFetching(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push('/about-us'),
      fetchTodosIfNeeded: fetchTodosIfNeededAction,
      invalidateList: invalidateListAction,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
