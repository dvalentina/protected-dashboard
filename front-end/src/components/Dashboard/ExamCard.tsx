import React, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { blue, grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

import { API_URL, JWT_TOKEN_NAME } from '../../constants/constants';

function ExamCard() {
  const [result, setResult] = useState({ score: 0, max: 0, passed: false });
  const token = window.localStorage.getItem(JWT_TOKEN_NAME);

  const userId = 1;

  useEffect(() => {
    fetch(`${API_URL}/results?userId=${userId}`, {
      method: 'GET',
      credentials: 'include',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setResult({ score: data[0].score, max: data[0].max, passed: data[0].passed });
      });
  }, []);

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
          {`${result.score} of ${result.max}`}
        </Typography>
        <Typography component="p" variant="overline" color={grey[700]}>
          {result.passed ? 'PASSED' : 'FAILED'}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ExamCard;
