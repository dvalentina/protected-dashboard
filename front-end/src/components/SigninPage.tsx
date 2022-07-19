import React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function SigninPage() {
  return (
    <Container maxWidth="xs">
      <SigninHeader />
      <SigninForm />
    </Container>
  );
}

function SigninHeader() {
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

function SigninForm() {
  return (
    <Box component="form" sx={{ mt: 1 }}>
      <TextField required id="email" label="Email Adress" variant="outlined" margin="normal" fullWidth />
      <TextField required id="password" label="Password" type="password" variant="outlined" margin="normal" fullWidth />
      <Button variant="contained" type="submit" sx={{ mt: 3 }} fullWidth>
        Sign In
      </Button>
    </Box>
  );
}

export default SigninPage;
