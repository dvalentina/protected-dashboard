import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import SignInForm from '../components/SignIn/SignInForm';
import SignInPage from '../components/SignIn/SignInPage';
import { JWT_TOKEN_NAME } from '../constants/constants';

import { signIn } from './utils';

import '@testing-library/jest-dom';

beforeEach(() => {
  window.localStorage.clear();
});

afterAll(() => {
  window.localStorage.clear();
});

const mockHandleUserIdChange = jest.fn();

test('displays sign in page', async () => {
  render(<SignInPage handleUserIdChange={mockHandleUserIdChange} />, { wrapper: BrowserRouter });

  expect(screen.getByRole('heading')).toHaveTextContent(/sign in$/i);
});

test('displays sign in form', async () => {
  render(<SignInPage handleUserIdChange={mockHandleUserIdChange} />, { wrapper: BrowserRouter });

  expect(screen.getByRole('form')).toBeInTheDocument();
});

test('sign in form has email and password fields', async () => {
  render(<SignInForm handleUserIdChange={mockHandleUserIdChange} />, { wrapper: BrowserRouter });

  expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  expect(screen.getByLabelText('password', { exact: false })).toBeInTheDocument();
});

test('the input value should change', async () => {
  render(<SignInForm handleUserIdChange={mockHandleUserIdChange} />, { wrapper: BrowserRouter });

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText('password', { exact: false });

  fireEvent.change(emailInput, { target: { value: 'user@email.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  expect(emailInput).toHaveValue('user@email.com');
  expect(passwordInput).toHaveValue('password');
});

test('saves auth token to localStorage on signing in', async () => {
  render(<SignInForm handleUserIdChange={mockHandleUserIdChange} />, { wrapper: BrowserRouter });

  signIn(true);

  await waitFor(() => expect(window.localStorage.getItem(JWT_TOKEN_NAME)).toBeTruthy());
});

test('sets userId on signing in', async () => {
  render(<SignInForm handleUserIdChange={mockHandleUserIdChange} />, { wrapper: BrowserRouter });

  signIn(true);

  await waitFor(() => expect(mockHandleUserIdChange).toHaveBeenCalled());
});

test('handles signing in error', async () => {
  render(<SignInForm handleUserIdChange={mockHandleUserIdChange} />, { wrapper: BrowserRouter });

  signIn(false);

  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/incorrect/i));
});

test('signing in error alert disappears if closed', async () => {
  render(<SignInForm handleUserIdChange={mockHandleUserIdChange} />, { wrapper: BrowserRouter });

  signIn(false);

  const close = await waitFor(() => screen.getByLabelText('close'));

  fireEvent.click(close);

  await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
});
