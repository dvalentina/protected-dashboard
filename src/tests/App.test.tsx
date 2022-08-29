import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import { render, screen, waitFor } from '@testing-library/react';

import App from '../components/App';
import { JWT_TOKEN_NAME } from '../constants/constants';

import { signIn, signOut } from './utils';

import '@testing-library/jest-dom';

beforeEach(() => {
  window.localStorage.clear();
});

afterAll(() => {
  window.localStorage.clear();
});

test('unauthorized user gets redirected to sign in page from random route', async () => {
  const route = '/hbjkop';

  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading')).toHaveTextContent(/sign in/i);
});

test('unauthorized user gets redirected to sign in page from dashboard route', async () => {
  const route = '/dashboard';

  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading')).toHaveTextContent(/sign in/i);
});

test('user gets redirected to dashboard page after signing in', async () => {
  render(<App />, { wrapper: BrowserRouter });

  signIn(true);

  await waitFor(() => expect(screen.getByRole('banner')).toHaveTextContent(/dashboard/i));
});

test('user sees their exam results after signing in', async () => {
  render(<App />, { wrapper: BrowserRouter });

  signIn(true);

  await waitFor(() => expect(screen.getByText('2 of 10')).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText('failed', { exact: false })).toBeInTheDocument());
});

test('user gets redirected to sign page after signing out', async () => {
  render(<App />, { wrapper: BrowserRouter });

  signIn(true);
  signOut();

  await waitFor(() => expect(screen.getByRole('heading')).toHaveTextContent(/sign in/i));
});

test('auth token gets destroyed after signing out', async () => {
  render(<App />, { wrapper: BrowserRouter });

  signIn(true);

  await waitFor(() => expect(window.localStorage.getItem(JWT_TOKEN_NAME)).toBeTruthy());

  signOut();

  await waitFor(() => expect(window.localStorage.getItem(JWT_TOKEN_NAME)).toBeNull());
});

test('user authorizes if storage has auth token', async () => {
  const { unmount } = render(<App />, { wrapper: BrowserRouter });

  signIn(true);

  await waitFor(() => expect(window.localStorage.getItem(JWT_TOKEN_NAME)).toBeTruthy());

  unmount();

  const route = '/dashboard';

  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );

  await waitFor(() => expect(screen.getByText('failed', { exact: false })).toBeInTheDocument());
});

test('removes auth token from storage if it is invalid', async () => {
  window.localStorage.setItem(JWT_TOKEN_NAME, 'invalid token');

  const route = '/dashboard';

  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );

  await waitFor(() => expect(window.localStorage.getItem(JWT_TOKEN_NAME)).toBeNull());
});

test('redirects to sign in page if auth token is invalid', async () => {
  window.localStorage.setItem(JWT_TOKEN_NAME, 'invalid token');

  const route = '/dashboard';

  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );

  await waitFor(() => expect(screen.getByRole('heading')).toHaveTextContent(/sign in/i));
});
