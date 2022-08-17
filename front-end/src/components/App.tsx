import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { API_URL } from '../constants/constants';
import { TypedResponse } from '../types';

import Dashboard from './Dashboard';
import RequireAuth from './RequireAuth';
import SigninPage from './SigninPage';

function App() {
  const [auth, setAuth] = useState(false);

  const signin = (email: string, password: string) => {
    setAuth(true);

    const data = {
      email,
      password,
    };

    fetch(`${API_URL}/auth/`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
    })
      .then(async (response) => {
        const json = await (response.json() as Promise<TypedResponse>);

        if (!response.ok) {
          throw Error(json.message || response.statusText);
        }
      })
      .catch((error) => console.log(error.message));
  };

  const signout = () => {
    setAuth(false);
  };

  return (
    <CssBaseline>
      <Routes>
        <Route path="/" element={<Link to="/exam">Find out your exam result!</Link>} />
        <Route path="/signin" element={<SigninPage signin={signin} />} />
        <Route
          path="/exam"
          element={
            <RequireAuth auth={auth}>
              <Dashboard signout={signout} />
            </RequireAuth>
          }
        />
        <Route path="*" element={<p>Nothing here</p>} />
      </Routes>
    </CssBaseline>
  );
}

export default App;
