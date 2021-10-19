const PASSWORD_LENGTH = 7;

export const validatePassword = (password) => password.length >= PASSWORD_LENGTH;

export const validateEmail = (email) => (
  /^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/i)
  .test(email);
