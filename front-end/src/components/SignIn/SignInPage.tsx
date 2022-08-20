import React from 'react';

import Container from '@mui/material/Container';

import { ISignIn } from '../../types';

import SignInForm from './SignInForm';
import SignInHeader from './SignInHeader';

function SignInPage({ handleUserIdChange }: ISignIn) {
  return (
    <Container maxWidth="xs">
      <SignInHeader />
      <SignInForm handleUserIdChange={handleUserIdChange} />
    </Container>
  );
}

export default SignInPage;
