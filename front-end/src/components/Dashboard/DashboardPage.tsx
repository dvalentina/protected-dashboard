import React from 'react';

import { IDashboard } from '../../types';

import DashboardHeader from './DashboardHeader';
import ExamCard from './ExamCard';

function DashboardPage({ userId }: IDashboard) {
  return (
    <>
      <DashboardHeader />
      <ExamCard userId={userId} />
    </>
  );
}

export default DashboardPage;
