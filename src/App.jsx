import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import Home from './Home';
import Todos from './containers/Todos/Loadable';
import LocaleResolver from './containers/LanguageProvider/LocaleResolver';
import logo from './logo.svg';
import './App.css';

const DefaultLocaleResolver = props => (
  <LocaleResolver {...props} defaultPage="todos" />
);

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
    <Route exact path="/" component={DefaultLocaleResolver} />
    <Route path="/:locale" component={DefaultLocaleResolver} />
    <Switch>
      <Route exact path="/:locale/todos" component={Todos} />
    </Switch>
  </div>
);

export default App;
