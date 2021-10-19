import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import Explorer from '../pages/Explore';

describe('Testa a página Explore', () => {
  it('caminho da página correto', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });

  it('título da página', () => {
    renderWithRouter(<Explorer />);
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });

  it('presença de um botão de explorar comidas e outro de explorar bebidas', () => {
    renderWithRouter(<Explorer />);
    const btnExploreFoods = screen.getByRole('button', {
      name: /Explorar Comidas/i,
    });
    const btnExploreDrinks = screen.getByRole('button', {
      name: /Explorar Bebidas/i,
    });
    expect(btnExploreFoods).toBeInTheDocument();
    expect(btnExploreDrinks).toBeInTheDocument();
  });

  it('rota do botão de explorar comidas', () => {
    const { history } = renderWithRouter(<Explorer />);
    const btnExploreFoods = screen.getByRole('button', {
      name: /Explorar Comidas/i,
    });
    userEvent.click(btnExploreFoods);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('rota do botão de explorar bebidas', () => {
    const { history } = renderWithRouter(<Explorer />);
    const btnExploreDrinks = screen.getByRole('button', {
      name: /Explorar Bebidas/i,
    });
    userEvent.click(btnExploreDrinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
