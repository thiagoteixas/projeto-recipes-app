import React, { useState } from 'react';
import Header from './Header';

function RecipeDone() {
  const [recipeDone] = useState([0]);

  return (
    <div className="recipe-done">
      <Header />
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>

      <p>
        {
          recipeDone.map((value, index) => (
            <p
              key={ index }
              data-testid={ `${index}-horizontal-image` }
            >
              { value }
            </p>
          ))
        }
      </p>

      <p>
        {
          recipeDone.map((value, index) => (
            <p
              key={ index }
              data-testid={ `${index}-horizontal-top-text` }
            >
              { value }
            </p>
          ))
        }
      </p>

      <p>
        {
          recipeDone.map((value, index) => (
            <p
              key={ index }
              data-testid={ `${index}-horizontal-name` }
            >
              { value }
            </p>
          ))
        }
      </p>
      <p>
        {
          recipeDone.map((value, index) => (
            <p
              key={ index }
              data-testid={ `${index}-horizontal-done-date` }
            >
              { value }
            </p>
          ))
        }
      </p>
      <p>
        {
          recipeDone.map((value, index) => (
            <p
              key={ index }
              data-testid={ `${index}-horizontal-share-btn` }
            >
              { value }
            </p>
          ))
        }
      </p>
      <div data-testid="0-Pasta-horizontal-tag" />
      <div data-testid="0-Curry-horizontal-tag" />
      <div data-testid="0-Pasta-horizontal-tag" />
      <div data-testid="1-horizontal-image" />
      <div data-testid="1-horizontal-top-text" />
      <div data-testid="1-horizontal-name" />
      <div data-testid="1-horizontal-share-btn" />
      <div data-testid="1-horizontal-done-date" />
    </div>
  );
}

export default RecipeDone;
