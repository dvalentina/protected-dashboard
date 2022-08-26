import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import Dashboard from './Dashboard/Dashboard';
import SignInPage from './SignIn/SignInPage';
import RequireAuth from './RequireAuth';

function App() {
  const [userId, setUserId] = useState(-1);

  const handleUserIdChange = (value: number) => {
    setUserId(value);
  };

  return (
    <CssBaseline>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/signin" element={<SignInPage handleUserIdChange={handleUserIdChange} />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard userId={userId} />
            </RequireAuth>
          }
        />
        <Route path="*" element={<p>Nothing here</p>} />
      </Routes>
    </CssBaseline>
  );
}

export default App;
