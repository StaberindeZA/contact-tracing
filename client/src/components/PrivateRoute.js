import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

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