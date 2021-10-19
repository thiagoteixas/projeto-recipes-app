import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { fetchRandom } from '../services/api';

function ExploreRecipes() {
  const [randomRecipe, setRandomRecipe] = useState(0);
  const history = useHistory();

  const isMealsPage = history.location.pathname.includes('comidas');
  const recipeType = isMealsPage ? 'comidas' : 'bebidas';

  useEffect(() => {
    const getRandomMeal = async () => {
      const recipeId = await fetchRandom(isMealsPage);
      setRandomRecipe(recipeId);
    };

    getRandomMeal();
  }, [isMealsPage]);

  function clickHandler() {
    history.push(`/${recipeType}/${randomRecipe}`);
  }

  function pushRoute(e) {
    if (e.target.id === 'ingredientes') {
      history.push(`/explorar/${isMealsPage ? 'comidas' : 'bebidas'}/ingredientes`);
      return;
    }

    if (e.target.id === 'area') history.push('/explorar/comidas/area');
  }

  return (
    <div className="explore-page">
      <Header onSearch={ () => false } />

      <button
        type="button"
        data-testid="explore-by-ingredient"
        className="btn-explore"
        name="Por Ingredientes"
        id="ingredientes"
        onClick={ pushRoute }
      >
        Por Ingredientes
      </button>

      { isMealsPage && (

        <button
          type="button"
          className="btn-explore"
          data-testid="explore-by-area"
          name="Por Local de Origem"
          id="area"
          onClick={ pushRoute }
        >
          Por Local de Origem
        </button>

      ) }
      <button
        type="button"
        data-testid="explore-surprise"
        name="Me Surpreenda!"
        className="btn-explore"
        onClick={ clickHandler }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreRecipes;
