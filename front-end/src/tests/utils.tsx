import { fireEvent, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';

export function signIn(userExists: boolean) {
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText('password', { exact: false });

  const email = userExists ? 'nilson@email.com' : 'noSuchUser@email.com';
  const password = userExists ? 'nilson' : 'unexistent';

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });

  const submit = screen.getByRole('button', { name: /sign in/i });

  fireEvent.click(submit);
}

export async function signOut() {
  const menu = await waitFor(() => screen.getByLabelText('menu'));

  fireEvent.click(menu);

  const option = await waitFor(() => screen.findByRole('menuitem', { name: /sign out/i }));

  fireEvent.click(option);
}
