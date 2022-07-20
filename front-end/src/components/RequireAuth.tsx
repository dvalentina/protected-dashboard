import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IRequireAuth {
  auth: boolean;
  children: JSX.Element;
}

function RequireAuth({ auth, children }: IRequireAuth) {
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
