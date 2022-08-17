import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { JWT_TOKEN_NAME } from '../constants/constants';

interface IRequireAuth {
  children: JSX.Element;
}

function RequireAuth({ children }: IRequireAuth) {
  const token = window.localStorage.getItem(JWT_TOKEN_NAME);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
