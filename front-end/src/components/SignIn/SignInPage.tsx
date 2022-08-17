import React from 'react';

import Container from '@mui/material/Container';

import SignInForm from './SignInForm';
import SignInHeader from './SignInHeader';

function SignInPage() {
  return (
    <Container maxWidth="xs">
      <SignInHeader />
      <SignInForm />
    </Container>
  );
}

export default SignInPage;
