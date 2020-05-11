import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

// TODO: Add logic to return user to original route once authenticated. (Last couple of steps in the link below)
// https://tylermcginnis.com/react-router-protected-routes-authentication/

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} /> 
);

export default connect(
  state => state.auth,
  null
)(PrivateRoute);