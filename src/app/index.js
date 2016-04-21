/**
 * App entry point
 */

// Polyfills
import "babel-polyfill";

import es6Promise from 'es6-promise';
import 'whatwg-fetch';
es6Promise.polyfill();

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
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
import SubjectDetails from './components/App/SubjectDetails';
import SubjectResults from './components/App/SubjectResults';
import Portal from './components/App/Portal'
import About from './components/App/About';

// ID of the DOM element to mount app on
const DOM_APP_EL_ID = 'app';

// Render the router
document.addEventListener('DOMContentLoaded',() => {
    ReactDOM.render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="subjects/:id" component={SubjectDetails} />
        <Route path="subjects/:id/results" component={SubjectResults} />
        <Route path="portal" component={Portal} />
        <Route path="about" component={About} />
      </Route>
    </Router>
  ), document.getElementById(DOM_APP_EL_ID));
});
