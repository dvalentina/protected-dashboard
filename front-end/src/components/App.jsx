import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import ExamCard from './ExamCard.tsx';
import LoginPage from './LoginPage.tsx';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Link to="/exam">Find out your exam result!</Link>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/exam' element={<ExamCard />} />
      <Route path='*' element={<p>Nothing here</p>} />
    </Routes>
  );
}

export default App;
