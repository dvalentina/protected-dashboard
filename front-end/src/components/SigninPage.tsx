import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface ISignin {
  signin: (username: string, password: string) => void;
}

function SigninPage({ signin }: ISignin) {
  return (
    <Container maxWidth="xs">
      <SigninHeader />
      <SigninForm signin={signin} />
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

function SigninForm({ signin }: ISignin) {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setFormData((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  // @ts-ignore
  const from = location.state?.from?.pathname || '/';

  return (
    <Box component="form" sx={{ mt: 1 }}>
      <TextField
        required
        id="email"
        name="email"
        label="Email Adress"
        variant="outlined"
        margin="normal"
        fullWidth
        value={formData.email}
        onChange={changeInputHandler}
      />
      <TextField
        required
        id="password"
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        value={formData.password}
        onChange={changeInputHandler}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 3 }}
        onClick={() => {
          signin(formData.email, formData.password);
          navigate(from, { replace: true });
        }}
        fullWidth
      >
        Sign In
      </Button>
    </Box>
  );
}

export default SigninPage;
