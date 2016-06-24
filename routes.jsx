import React from 'react';
import ReactRouter from 'react-router';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import Welcome from './components/Welcome.jsx';
import UserControl from './components/UserControl.jsx';
import NewUser from './components/NewUser.jsx';
import Realtime from './components/Realtime.jsx';

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Welcome} />
    <Route path='/users/control' component={UserControl} />
    <Route path='/realtime/show' component={Realtime} />
    <Route path='/users/new' component={NewUser} />
  </Router>
);

module.exports = routes;
