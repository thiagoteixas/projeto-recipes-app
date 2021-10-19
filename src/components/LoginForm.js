import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/login.css';

import { validateEmail, validatePassword } from '../utils/auth';

const BORDER_DANGER = '2px solid rgba(255, 0, 0, 0.4)';

function Login() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const history = useHistory();

  const validPassword = validatePassword(password);
  const validEmail = validateEmail(email);

  const isValid = validEmail && validPassword;

  let emailTouched = false;
  let passwordTouched = false;

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  if (email.length > 1) emailTouched = true;
  if (password.length > 1) passwordTouched = true;

  return (
    <form className="login-form">
      <h1>Login</h1>
      <input
        data-testid="email-input"
        placeholder="Email"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
        name="email"
        style={ { border: !validEmail && emailTouched ? BORDER_DANGER : '' } }
      />
      <input
        data-testid="password-input"
        placeholder="Senha"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
        name="password"
        type="password"
        style={ { border: !validPassword && passwordTouched ? BORDER_DANGER : '' } }
      />
      <button
        data-testid="login-submit-btn"
        onClick={ handleClick }
        type="submit"
        disabled={ !isValid }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
