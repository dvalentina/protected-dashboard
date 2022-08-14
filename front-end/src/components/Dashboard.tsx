import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { blue, grey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface IDashboard {
  signout: () => void;
}

function Dashboard({ signout }: IDashboard) {
  return (
    <>
      <Header signout={signout} />
      <ExamCard />
    </>
  );
}

function Header({ signout }: IDashboard) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            signout();
            navigate('/');
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
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
