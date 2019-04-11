import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import routes from '../../constants/routes';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('user') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: routes.REGISTER, state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
