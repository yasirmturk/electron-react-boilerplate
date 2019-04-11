import React from 'react';
import { Switch, Route } from 'react-router';
import PrivateRoute from './components/HOC/PrivateRoute';
import Notifier from './components/Notifier';
import routes from './constants/routes';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';

export default () => (
  <App>
    <Notifier />
    <Switch>
      <Route
        path={routes.REGISTER}
        // component={RegisterPage}
        render={props => <LoginPage {...props} page="register" />}
      />
      <Route
        path={routes.LOGIN}
        // component={LoginPage}
        render={props => <LoginPage {...props} page="login" />}
      />
      <PrivateRoute path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
