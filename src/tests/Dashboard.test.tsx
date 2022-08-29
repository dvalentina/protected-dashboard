import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DashboardPage from '../components/Dashboard/DashboardPage';

import { signOut } from './utils';

import '@testing-library/jest-dom';

beforeEach(() => {
  window.localStorage.clear();
});

afterAll(() => {
  window.localStorage.clear();
});

test('displays dashboard page', async () => {
  render(<DashboardPage userId={0} />, { wrapper: BrowserRouter });

  expect(screen.getByRole('banner')).toHaveTextContent(/dashboard/i);
});

test('sign out option appears after clicking on menu', async () => {
  render(<DashboardHeader />, { wrapper: BrowserRouter });

  const menu = screen.getByLabelText('menu');

  fireEvent.click(menu);

  const option = await waitFor(() => screen.findByRole('menuitem', { name: /sign out/i }));

  expect(option).toBeInTheDocument();
});

test('sign out option disappears after clicking on it', async () => {
  render(<DashboardHeader />, { wrapper: BrowserRouter });

  signOut();

  await waitFor(() => expect(screen.queryByRole('menuitem', { name: /sign out/i })).not.toBeInTheDocument());
});
