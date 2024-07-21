import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import authService from '../services/authService';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const user = authService.getDecodedToken();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.indexOf(user.role) === -1) {
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
