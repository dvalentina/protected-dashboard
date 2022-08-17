import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import Dashboard from './Dashboard/Dashboard';
import SignInPage from './SignIn/SignInPage';
import RequireAuth from './RequireAuth';

function App() {
  return (
    <CssBaseline>
      <Routes>
        <Route path="/" element={<Link to="/exam">Find out your exam result!</Link>} />
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/exam"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<p>Nothing here</p>} />
      </Routes>
    </CssBaseline>
  );
}

export default App;
