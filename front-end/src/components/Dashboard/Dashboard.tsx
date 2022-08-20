import React from 'react';

import { IDashboard } from '../../types';

import DashboardHeader from './DashboardHeader';
import ExamCard from './ExamCard';

function Dashboard({ userId }: IDashboard) {
  return (
    <>
      <DashboardHeader />
      <ExamCard userId={userId} />
    </>
  );
}

export default Dashboard;
