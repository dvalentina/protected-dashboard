import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import Dashboard from './Dashboard.tsx';
import SigninPage from './SigninPage.tsx';

function App() {
  return (
    <CssBaseline>
      <Routes>
        <Route path="/" element={<Link to="/exam">Find out your exam result!</Link>} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/exam" element={<Dashboard />} />
        <Route path="*" element={<p>Nothing here</p>} />
      </Routes>
    </CssBaseline>
  );
}

export default App;
