import React from 'react';
import PropTypes from 'prop-types';

import '../styles/recipes-list.css';

import Card from './Card';

const MAX_ELEMENTS_PER_PAGE = 12;

function RecipesList({ list, category }) {
  const readyToLoad = list.length > 0;

  const mapRecipes = (arr) => (
    arr.map((food, i) => {
      if (category === 'meals') {
        return Card(food.strMeal, food.strMealThumb, food.idMeal, { i, category });
      }
      if (category === 'drinks') {
        return Card(food.strDrink, food.strDrinkThumb, food.idDrink, { i, category });
      }

      return food;
    })
      .slice(0, MAX_ELEMENTS_PER_PAGE)
  );

  return (
    <div className="list-container">
      <div className="recipes-list">
        { readyToLoad ? mapRecipes(list) : <h1>Loading...</h1> }
      </div>
    </div>
  );
}

RecipesList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.string.isRequired,
};

export default RecipesList;
