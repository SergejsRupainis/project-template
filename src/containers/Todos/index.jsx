import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../../utils/injectReducer';
import reducer, {
  makeSelectItems,
  makeSelectIsFetching,
  fetchTodosIfNeeded,
  fetchInvalidate,
} from './todos';

const selectedListId = 1;

class Todos extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { fetchTodos } = this.props;
    fetchTodos(selectedListId);
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

    const { refresh } = this.props;
    refresh(selectedListId);
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

Todos.propTypes = {
  changePage: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchTodos: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  title: PropTypes.string,
  lastUpdated: PropTypes.number,
};

Todos.defaultProps = {
  title: 'Dummy title',
  lastUpdated: Date.now(),
};

const mapStateToProps = createStructuredSelector({
  todos: makeSelectItems(),
  isFetching: makeSelectIsFetching(),
});

const mapDispatchToProps = dispatch => ({
  fetchTodos: listId => dispatch(fetchTodosIfNeeded(listId)),
  refresh: listId => {
    dispatch(fetchInvalidate(listId));
    dispatch(fetchTodosIfNeeded(listId));
  },
  changePage: () => dispatch(push('/about-us')),
});

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
)(Todos);
