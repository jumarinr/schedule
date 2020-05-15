import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
const createBrowserHistory = require('history').createBrowserHistory;

import Login from '../Componentes/Login/Login.jsx';
import Register from '../Componentes/Login/Register.jsx';
import Inicio from '../Componentes/Dashboard/Inicio.jsx';

const history = createBrowserHistory();
const unauthenticatedPages = ['/', '/Register'];
const authenticatedPages = ['/Inicio'];

const publicPage = function  () {
    if (Meteor.userId()) {
        history.replace('/Inicio');
    }
};

const privatePage = function  () {
    if(! Meteor.userId()) {
        history.replace('/');
    }
};

export const routes = (
    <Router history = {history}>
        <Switch>
          <Route exact path='/' component= {Login} onEnter={publicPage}/>
          <Route exact path='/Register' component={Register} onEnter={publicPage}/>
          <Route exact path='/Inicio' render={ () => <Inicio greet='User'/> } onEnter={privatePage} />
          {/* <Route component={NotFound}/> */}
        </Switch>
    </Router>
);

export const onAuthChange = function (authenticated) {
    console.log("isAuthenticated: ", authenticated);
    const path = history.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(path);
    const isAuthenticatedPage = authenticatedPages.includes(path);
    if (authenticated && isUnauthenticatedPage) {   // pages: /signup and /
        console.log(`Authenticated user routed to the path /Inicio`);
        history.replace('/Inicio');
    } else if (!authenticated && isAuthenticatedPage) {
        console.log(`Unauthenticated user routed to the path /`);
        history.replace('/');
    }
}
