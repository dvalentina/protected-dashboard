import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import Dashboard from './Dashboard';
import RequireAuth from './RequireAuth';
import SigninPage from './SigninPage';

function App() {
  const [auth, setAuth] = useState(false);

  const signin = () => {
    setAuth(true);
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
