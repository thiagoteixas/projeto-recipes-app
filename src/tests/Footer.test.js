import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import renderWithRouter from '../helpers/renderWithRouter';
import Explorer from '../pages/Explore';

describe('Footer', () => {
  it('imagens dos ícones', () => {
    renderWithRouter(<Explorer />);
    const drinkAltIcon = screen.getByAltText(/Drink Icon/i);
    expect(drinkAltIcon.src).toBe(`http://localhost/${drinkIcon}`);

    const exploreAltIcon = screen.getByAltText(/Explore Icon/i);
    expect(exploreAltIcon.src).toBe(`http://localhost/${exploreIcon}`);

    const mealAltIcon = screen.getByAltText(/Meal Icon/i);
    expect(mealAltIcon.src).toBe(`http://localhost/${mealIcon}`);
  });

  it('rota do ícone de bebidas', () => {
    const { history } = renderWithRouter(<Explorer />);
    const btnDrink = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(btnDrink);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('rota do ícone de explorar', () => {
    const { history } = renderWithRouter(<Explorer />);
    const btnExplore = screen.getByTestId('explore-bottom-btn');
    userEvent.click(btnExplore);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });

  it('rota do ícone de comidas', () => {
    const { history } = renderWithRouter(<Explorer />);
    const btnFood = screen.getByTestId('food-bottom-btn');
    userEvent.click(btnFood);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
