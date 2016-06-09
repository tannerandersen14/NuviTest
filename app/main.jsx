import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Imports the components from their respective locations to be used with react-router.
import MainLayout from './components/MainLayout.jsx';
import Home from './components/Home.jsx';
import Actors from './components/Actors.jsx';
import Provider from './components/Provider.jsx';
import NoMatch from './components/NoMatch.jsx';

// Defines the routes for react-router.
render((
    <Router history={ browserHistory } >
      <Route path='/' component={ MainLayout } >
        <IndexRoute component={ Home } />
        <Route path='/actors' component={ Actors } />
        <Route path='/provider/:name' component={ Provider } />
        <Route path="*" component={ NoMatch }/>
      </Route>
    </Router>
), document.getElementById('root'));