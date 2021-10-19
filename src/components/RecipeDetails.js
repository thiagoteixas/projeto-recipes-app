import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getRecipe } from '../helpers/getFoodOrDrinkProperties';
import Context from '../context/Context';
import handleFavorite from '../helpers/handleFavorite';
import '../styles/details.css';
import { fetchRecipeById, fetchRecommendations } from '../services/api';

let RECIPE_DATA = {
  image: '',
  name: '',
  subCategory: '',
  instructions: '',
  ingredients: '',
  video: '',
  area: '',
  category: '',
  alcoholicOprNot: '',
};

// const bodyWidth = document.body.offsetWidth;
// const LARGE_MOBILE_SCREEN = 425;
// const INIT_WIDTH = bodyWidth <= LARGE_MOBILE_SCREEN ? bodyWidth / 2 : '10rem';

function start(callback, type, id) {
  callback(`/${type}s/${id}/in-progress`);
}

function storeRecipe(recipe, context) {
  const type = window.location.href.includes('comida') ? 'comida' : 'bebida';
  const { startedRecipes, setStartedRecipes } = context;

  if (type === 'comida') {
    setStartedRecipes(
      { ...startedRecipes, meals: [...startedRecipes.meals, recipe] },
    );
  }

  if (type === 'bebida') {
    setStartedRecipes(
      { ...startedRecipes, cocktails: [...startedRecipes.cocktails, recipe] },
    );
  }
}

const RecipeDetails = () => {
  const width = '250';
  const [object, setObject] = useState();
  const [featured, setFeatured] = useState();
  // const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const context = useContext(Context);
  const { handleShare, copied } = useContext(Context);
  const type = window.location.href.includes('comida') ? 'comida' : 'bebida';
  const featType = type === 'comida' ? 'bebida' : 'comida';
  const key = type === 'comida' ? 'meals' : 'cocktails';
  const { startedRecipes } = context;
  const hasStarted = startedRecipes[key].some((x) => x.id === id);
  if (object) RECIPE_DATA = { ...getRecipe(object, type) };

  useEffect(() => {
    fetchRecipeById(type, id).then((recipe) => setObject(recipe));
    fetchRecommendations(type).then((arr) => setFeatured(arr));
  }, [type, id]);

  /*   window.addEventListener('resize', () => {
    const { offsetWidth } = document.body;
    if (offsetWidth <= LARGE_MOBILE_SCREEN) return setWidth(`${offsetWidth / 2}px`);
    setWidth('10rem');
  }); */

  // function handleShare() {
  //   navigator.clipboard.writeText(window.location.href);
  //   setCopied(true);
  // }

  let icon = whiteHeartIcon;
  const localFavorites = localStorage.getItem('favoriteRecipes');

  if (localFavorites) {
    const localArray = JSON.parse(localFavorites);
    const isFavorite = localArray.some((el) => (el.id === id));
    if (isFavorite) icon = blackHeartIcon;
  }

  function handleStart() {
    if (hasStarted) start(history.push, type, id);
    const recipe = { id, ...RECIPE_DATA };
    storeRecipe(recipe, context);
    start(history.push, type, id);
  }

  const { image, name, subCategory, instructions, ingredients, video } = RECIPE_DATA;
  const { area, category, alcoholicOrNot } = RECIPE_DATA;
  const FAV_RECIPE = { type, area, category, alcoholicOrNot, name, image };
  const paramsOfFavorite = { id, FAV_RECIPE, setFavorite, favorite };

  return (
    <div className="recipe-details">
      {
        !object ? 'Loading'
          : (
            <div>
              <div className="details-page">
                { copied && <h1>Link copiado!</h1> }
                <img
                  data-testid="recipe-photo"
                  src={ image }
                  alt={ name }
                  className="main-photo"
                />
                <h1
                  data-testid="recipe-title"
                >
                  {name}
                </h1>
                <button
                  type="button"
                  onClick={ handleShare }
                >
                  <img
                    data-testid="share-btn"
                    src={ shareIcon }
                    alt="share Icon"
                  />
                </button>
                <button
                  type="button"
                  onClick={ () => (handleFavorite(paramsOfFavorite)) }
                >
                  <img
                    data-testid="favorite-btn"
                    src={ icon }
                    alt="whiteHeart icon"
                    id={ id }
                  />
                </button>
                <br />
                <h3
                  data-testid="recipe-category"
                >
                  {subCategory}
                </h3>
                <h5>Ingredients</h5>
                <br />
                <ul>
                  {
                    ingredients.map((ingredient, index) => (
                      <li
                        key={ index }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        {ingredient}
                      </li>
                    ))
                  }
                </ul>
                <br />
                <p
                  data-testid="instructions"
                >
                  {instructions}
                </p>
                <br />
                {
                  type === 'comida' && (
                    <iframe
                      data-testid="video"
                      title={ name }
                      src={ video }
                    />
                  )
                }
                <div className="scroll-container">
                  <div className="recommendations">
                    {
                      featured && featured.map((value, index) => {
                        const feat = getRecipe(value, featType);
                        return (
                          <div
                            className="card"
                            key={ index }
                            style={ { width } }
                            data-testid={ `${index}-recomendation-card` }
                          >
                            <img src={ feat.image } alt="feat.name" />
                            <b>{ feat.subCategory }</b>
                            <p data-testid={ `${index}-recomendation-title` }>
                              { feat.name }
                            </p>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
                <button
                  type="button"
                  data-testid="start-recipe-btn"
                  className="start-btn"
                  onClick={ handleStart }
                >
                  { hasStarted ? 'Continuar Receita' : 'Iniciar a Receita' }
                </button>
              </div>
            </div>
          )
      }
    </div>
  );
};

export default RecipeDetails;
