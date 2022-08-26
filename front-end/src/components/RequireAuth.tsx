import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { JWT_TOKEN_NAME } from '../constants/constants';
import { IRequireAuth } from '../types';

function RequireAuth({ children }: IRequireAuth) {
  const location = useLocation();

  const token = window.localStorage.getItem(JWT_TOKEN_NAME);

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
