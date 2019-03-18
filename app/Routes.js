import React from 'react';
import { Switch, Route } from 'react-router';
import PrivateRoute from './components/PrivateRoute';
import Notifier from './components/Notifier';
import routes from './constants/routes';
import App from './containers/App';
import RegisterPage from './containers/RegisterPage';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';

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
      <Route path={routes.REGISTER} component={RegisterPage} />
      <Route path={routes.LOGIN} component={LoginPage} />
      <PrivateRoute path={routes.HOME} component={HomePage} />
      <PrivateRoute path={routes.COUNTER} component={CounterPage} />
    </Switch>
  </App>
);
