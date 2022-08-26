import React, { useEffect, useState } from 'react';

import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { blue, grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

import { API_URL, JWT_TOKEN_NAME } from '../../constants/constants';
import { IDashboard } from '../../types';

function ExamCard({ userId }: IDashboard) {
  const [result, setResult] = useState({ score: 0, max: 0, passed: false });
  const [isLoading, setIsLoading] = useState(true);
  const token = window.localStorage.getItem(JWT_TOKEN_NAME);

  useEffect(() => {
    fetch(`${API_URL}/results?userId=${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setResult({ score: data[0].score, max: data[0].max, passed: data[0].passed });
        setIsLoading(false);
      });
  }, []);

  function hasPassed() {
    return result.passed ? 'PASSED' : 'FAILED';
  }

  return (
    <Card sx={{ mt: 3, ml: 2, maxWidth: 275 }}>
      <CardContent>
        <Typography component="h2" variant="h6" color={blue[700]} gutterBottom>
          Exam result
        </Typography>
        <Typography component="p" variant="caption" color={grey[700]} gutterBottom>
          Your score is
        </Typography>
        <Typography component="p" variant="h4">
          {isLoading ? <Skeleton /> : `${result.score} of ${result.max}`}
        </Typography>
        <Typography component="p" variant="overline" color={grey[700]}>
          {isLoading ? <Skeleton /> : hasPassed()}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ExamCard;
