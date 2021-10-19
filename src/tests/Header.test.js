import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, render } from '@testing-library/react';
import App from '../App';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';

const HEADER_TEST_ID = 'main-header';
const PROFILE_BTN_TEST_ID = 'profile-top-btn';
const SEARCH_BTN_TEST_ID = 'search-top-btn';
const PAGE_TITLE_TEST_ID = 'page-title';

describe('Header', () => {
  it('Existe um elemento com tag header', () => {
    render(<App />);
    const btn = screen.getByText(/Entrar/i);
    const emailInput = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(passwordInput, VALID_PASSWORD);
    fireEvent.click(btn);

    const header = screen.getByTestId(HEADER_TEST_ID);

    expect(header.tagName).toBe('HEADER');
  });

  it('Existem dois botões: perfil e busca', () => {
    render(<App />);

    screen.getByTestId(PROFILE_BTN_TEST_ID);
    screen.getByTestId(SEARCH_BTN_TEST_ID);
  });

  it('Existe um título da página', () => {
    render(<App />);

    screen.getByTestId(PAGE_TITLE_TEST_ID);
  });
});
