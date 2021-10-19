import React from 'react';
import PropTypes from 'prop-types';

function ButtonsFavoriteRecipes({ filterFavoriteRecipe }) {
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterFavoriteRecipe('All') }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterFavoriteRecipe('Food') }
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterFavoriteRecipe('Drink') }
      >
        Drinks
      </button>
    </div>
  );
}

ButtonsFavoriteRecipes.propTypes = {
  filterFavoriteRecipe: PropTypes.func.isRequired,
};

export default ButtonsFavoriteRecipes;
