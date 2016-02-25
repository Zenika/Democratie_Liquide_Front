/**
 * App entry point
 */

// Polyfill
import "babel-polyfill";

// Libraries
import React from "react";
import ReactDOM from "react-dom";
import {
  Router,
  Route,
  hashHistory,
  IndexRoute
} from 'react-router';

// Component
import ZNavbar from './components/Navbar';
import App from './components/App';
import Home from './components/App/Home';
import NewSubject from './components/App/NewSubject';
import About from './components/About';

// ID of the DOM element to mount app on
const DOM_APP_EL_ID = "app";

// Render the router
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="subjects/new" component={NewSubject} />
      <Route path="about" component={About} />
    </Route>
  </Router>
), document.getElementById(DOM_APP_EL_ID));
