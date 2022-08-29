import React, { useEffect, useState } from 'react';

import { Card, CardContent, Skeleton, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

import { API_URL, JWT_TOKEN_NAME } from '../../constants/constants';
import { IDashboard } from '../../types';

function ExamCard({ userId }: IDashboard) {
  const [result, setResult] = useState({ score: 0, max: 0, passed: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId !== -1) {
      const token = window.localStorage.getItem(JWT_TOKEN_NAME);

      fetch(`${API_URL}/results?userId=${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          const data = resp[0];

          if (data === undefined) {
            throw Error('No exam results found');
          }

          setResult({ score: data.score, max: data.max, passed: data.passed });
          setIsLoading(false);
        })
        .catch((err) => console.log(err.message));
    }
  }, [userId]);

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
