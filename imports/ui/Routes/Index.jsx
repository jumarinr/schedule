import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
const createBrowserHistory = require("history").createBrowserHistory;

import Login from "../Componentes/Login/Login.jsx";
import Register from "../Componentes/Login/Register.jsx";
import Perfil from "../Componentes/Perfil/Perfil.jsx";
import InfoCuenta from "../Componentes/Perfil/InfoCuenta.jsx";
import Inicio from "../Componentes/Dashboard/Inicio.jsx";
import PageNotFound from "../Componentes/PageNotFound/PageNotFound.jsx";
import Musica from "../Componentes/Musica/Musica.jsx";
import Contacto from "../Componentes/Contacto/Contacto.jsx";
import Fotos from "../Componentes/Fotos/Fotos.jsx";

const history = createBrowserHistory();
const unauthenticatedPages = ["/", "/Register"];
const authenticatedPages = [
  "/Inicio",
  "/Perfil",
  "/Contacto",
  "/MyAccount",
  "/Musica",
  "/Calendario",
  "/Notas",
  "/Fotos"
];

const publicPage = function() {
  if (Meteor.userId()) {
    history.replace("/Inicio");
  }
};

const privatePage = function() {
  if (!Meteor.userId()) {
    history.replace("/");
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} onEnter={publicPage} />
      <Route exact path="/Register" component={Register} onEnter={publicPage} />
      <Route exact path="/Perfil" component={Perfil} onEnter={privatePage} />
      <Route exact path="/Fotos" component={Fotos} onEnter={privatePage} />
      <Route
        exact
        path="/MyAccount"
        component={InfoCuenta}
        onEnter={privatePage}
      />
      <Route
        exact
        path="/Inicio"
        render={() => <Inicio greet="User" />}
        onEnter={privatePage}
      />
      <Route
        exact
        path="/Musica"
        render={() => <Musica greet="User" />}
        onEnter={privatePage}
      />
      <Route
        exact
        path="/Contacto"
        render={() => <Contacto greet="User" />}
        onEnter={privatePage}
      />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
);

export const onAuthChange = function(authenticated) {
  console.log("isAuthenticated: ", authenticated);
  const path = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(path);
  const isAuthenticatedPage = authenticatedPages.includes(path);
  if (authenticated && isUnauthenticatedPage) {
    // pages: /signup and /
    console.log(`Authenticated user routed to the path /Inicio`);
    history.replace("/Inicio");
  } else if (!authenticated && isAuthenticatedPage) {
    console.log(`Unauthenticated user routed to the path /`);
    history.replace("/");
  }
};
