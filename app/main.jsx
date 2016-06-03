import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import MainLayout from './components/MainLayout.jsx';
import Home from './components/Home.jsx';
import Actors from './components/Actors.jsx';
import NoMatch from './components/NoMatch.jsx';

ReactDOM.render((
    <Router history={browserHistory}>
      <Route component={MainLayout}>
        <Route path='/' component={Home}/>
        <Route path='/actors' component={Actors}/>
      <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
), document.getElementById('root'));