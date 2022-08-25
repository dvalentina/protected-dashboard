import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { API_URL, JWT_TOKEN_NAME } from '../../constants/constants';
import { ISignIn, LocationProps, TypedResponse } from '../../types';

function SignInForm({ handleUserIdChange }: ISignIn) {
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const from = location.state?.from?.pathname || '/';

  const handleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.persist();

    fetch(`${API_URL}/auth/`, {
      method: 'POST',
      body: JSON.stringify(formData),
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
    })
      .then(async (response) => {
        const json = await (response.json() as Promise<TypedResponse>);

        if (!response.ok) {
          throw Error(json.message || response.statusText);
        }

        const { accessToken, userId } = json;

        if (accessToken) {
          window.localStorage.setItem(JWT_TOKEN_NAME, accessToken);
        }

        if (userId !== undefined) {
          handleUserIdChange(userId);
        }
      })
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => console.log(error.message));
  };

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.persist();
    setFormData((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

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
      <Button variant="contained" type="submit" sx={{ mt: 3 }} onClick={(e) => handleSignIn(e)} fullWidth>
        Sign In
      </Button>
    </Box>
  );
}

export default SignInForm;
