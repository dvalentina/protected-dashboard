import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { blue, grey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Dashboard() {
  return (
    <>
      <Header />
      <ExamCard />
    </>
  );
}

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function ExamCard() {
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
          9 of 10
        </Typography>
        <Typography component="p" variant="overline" color={grey[700]}>
          PASSED
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Dashboard;
