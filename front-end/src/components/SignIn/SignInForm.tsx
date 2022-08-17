import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { API_URL, JWT_TOKEN_NAME } from '../../constants/constants';
import { TypedResponse } from '../../types';

function SignInForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const signIn = (email: string, password: string) => {
    const data = {
      email,
      password,
    };

    fetch(`${API_URL}/auth/`, {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
    })
      .then(async (response) => {
        const json = await (response.json() as Promise<TypedResponse>);

        if (!response.ok) {
          throw Error(json.message || response.statusText);
        }

        window.localStorage.setItem(JWT_TOKEN_NAME, json.accessToken);
      })
      .catch((error) => console.log(error.message));
  };

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
          signIn(formData.email, formData.password);
          navigate(from, { replace: true });
        }}
        fullWidth
      >
        Sign In
      </Button>
    </Box>
  );
}

export default SignInForm;
