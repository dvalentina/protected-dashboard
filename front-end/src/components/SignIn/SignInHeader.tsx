import React from 'react';

import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

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
        <LockOutlined />
      </Avatar>
      <Typography variant="h5" component="h1">
        Sign in
      </Typography>
    </Box>
  );
}

export default SignInHeader;
