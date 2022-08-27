import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import { API_URL, JWT_TOKEN_NAME } from '../constants/constants';
import { TypedResponse } from '../types';

import Dashboard from './Dashboard/Dashboard';
import SignInPage from './SignIn/SignInPage';
import RequireAuth from './RequireAuth';

function App() {
  const [userId, setUserId] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === -1) {
      const token = window.localStorage.getItem(JWT_TOKEN_NAME);

      if (token) {
        fetch(`${API_URL}/users/me/`, {
          method: 'GET',
          credentials: 'include',
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(async (response) => {
            const json = await (response.json() as Promise<TypedResponse>);

            if (!response.ok) {
              throw Error(json.message || response.statusText);
            }

            if (json.userId !== undefined) {
              setUserId(json.userId);
            }
          })
          .catch((err) => {
            console.log(err.message);
            window.localStorage.removeItem(JWT_TOKEN_NAME);
            navigate('/signin');
          });
      }
    }
  });

  const handleUserIdChange = (value: number) => {
    setUserId(value);
  };

  return (
    <CssBaseline>
      <Routes>
        <Route path="/signin" element={<SignInPage handleUserIdChange={handleUserIdChange} />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard userId={userId} />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </CssBaseline>
  );
}

export default App;
