import React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { purple } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

function SignInHeader() {
  return (
    <Box
      sx={{
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ bgcolor: purple[500], m: 1 }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5" component="h1">
        Sign in
      </Typography>
    </Box>
  );
}

export default SignInHeader;
