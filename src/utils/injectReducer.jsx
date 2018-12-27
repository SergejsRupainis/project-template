import React from 'react';
import { ReactReduxContext } from 'react-redux';
// import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './reducerInjectors';

export default ({ key, reducer }) => WrappedComponent => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;

    static displayName = `withReducer(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    // injectors = getInjectors(this.context.store); // eslint-disable-line react/destructuring-assignment

    // componentWillMount() {
    //   const { injectReducer } = this.injectors;
    //   injectReducer(key, reducer);
    // }

    prepareInjector(store) {
      if (store !== this.store) {
        this.store = store;

        this.injectors = getInjectors(store);

        const { injectReducer } = this.injectors;
        injectReducer(key, reducer);
      }
    }

    renderWrappedComponent = value => {
      const { store } = value;
      this.prepareInjector(store);

      return <WrappedComponent {...this.props} />;
    };

    render() {
      const ContextToUse = this.props.context || ReactReduxContext; // eslint-disable-line react/destructuring-assignment

      return (
        <ContextToUse.Consumer>
          {this.renderWrappedComponent}
        </ContextToUse.Consumer>
      );
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
