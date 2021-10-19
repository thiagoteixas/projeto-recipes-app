import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa tela principal de receitas', () => {
  it('Path da página de comidas', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/comidas');
  });
});
