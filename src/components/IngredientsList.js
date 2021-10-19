import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/ingredients-list.css';
import '../styles/card.css';

import { fetchIngredients } from '../services/api';

const MAX_INGREDIENTS_LENGTH = 12;
const BASE_MEAL_THUMB_URL = 'https://www.themealdb.com/images/ingredients/';
const BASE_DRINK_THUMB_URL = 'https://www.thecocktaildb.com/images/ingredients/';

function IngredientsList() {
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  const isMealsPage = history.location.pathname.includes('comidas');
  const recipeType = isMealsPage ? 'comidas' : 'bebidas';
  const displayIngredients = ingredients.length > 0;
  const imgURL = isMealsPage ? BASE_MEAL_THUMB_URL : BASE_DRINK_THUMB_URL;

  useEffect(() => {
    const getRandomMeal = async () => {
      const arr = await fetchIngredients(isMealsPage);
      setIngredients(arr.slice(0, MAX_INGREDIENTS_LENGTH));
    };

    getRandomMeal();
  }, [isMealsPage]);

  return (
    <div className="ingredients-list-container">
      <div className="ingredients-list">
        { displayIngredients && (
          ingredients.map((el, i) => {
            const name = isMealsPage ? el.strIngredient : el.strIngredient1;
            const src = `${imgURL}${name}-Small.png`;

            return (
              <button
                key={ i }
                type="button"
                data-testid={ `${i}-ingredient-card` }
                className="ingredient-card card"
                onClick={ () => history.push(`/${recipeType}?ingredient=${name}`) }
              >
                <img
                  src={ src }
                  data-testid={ `${i}-card-img` }
                  alt="ingredient"
                />
                <h4 data-testid={ `${i}-card-name` }>
                  {name}
                </h4>
              </button>
            );
          })
        ) }
      </div>
    </div>
  );
}

export default IngredientsList;
