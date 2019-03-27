import React from 'react';
import { Switch, Route } from 'react-router';
import PrivateRoute from './components/PrivateRoute';
import Notifier from './components/Notifier';
import routes from './constants/routes';
import App from './containers/App';
import RegisterPage from './containers/RegisterPage';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';

export default () => (
  <App>
    <Notifier />
    <Switch>
      {/* <Route
        exact
        path={routes.LOGOUT}
        render={() =>
          localStorage.removeItem('user')(<Redirect to={routes.HOME} />)
        }
      />
      <Route exact path="/" render={() => (
            !this.props.isLoggedIn ? (
              <Redirect to="/login"/>
            ) : (
              <Redirect to="/main"/>
            )
          )}/> */}
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
