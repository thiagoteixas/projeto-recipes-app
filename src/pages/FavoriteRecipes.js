import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonsFavoriteRecipes from '../components/ButtonsFavoriteRecipes';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import '../styles/favorite-recipes.css';

function FavoriteRecipes() {
  const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const [favoriteRecipes, setFavoriteRecipes] = useState(getFavoriteRecipes);
  const { setCopied, copied } = useContext(Context);

  const filterFavoriteRecipe = (filter) => {
    if (filter === 'All') {
      setFavoriteRecipes(getFavoriteRecipes);
    } else if (filter === 'Food') {
      const filterFood = getFavoriteRecipes.filter(({ type }) => type === 'comida');
      setFavoriteRecipes(filterFood);
    } else {
      const filterDrink = getFavoriteRecipes.filter(({ type }) => type === 'bebida');
      setFavoriteRecipes(filterDrink);
    }
    setCopied(false);
  };

  const handleShareRecipe = (id, type) => {
    const location = window.location.href.split('receitas-favoritas', 1);
    navigator.clipboard.writeText(`${location}${type}s/${id}`);
    setCopied(true);
  };

  const removeFavoriteRecipe = (id) => {
    const filterRecipe = getFavoriteRecipes
      .filter((favoriteRecipe) => favoriteRecipe.id !== id);
    if (getFavoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterRecipe));
    }
    setFavoriteRecipes(filterRecipe);
    setCopied(false);
    console.log(getFavoriteRecipes);
  };

  useEffect(() => {
    setCopied(false);
  }, [setCopied]);

  if (getFavoriteRecipes) {
    return (
      <div>
        <Header />
        {copied && <h1>Link copiado!</h1>}
        <ButtonsFavoriteRecipes filterFavoriteRecipe={ filterFavoriteRecipe } />
        {
          favoriteRecipes
            .map(({ id, alcoholicOrNot, type, image, name, category, area }, index) => (
              type === 'comida' ? (
                <div key={ id }>
                  <div className="image-recipe">
                    <Link to={ `/comidas/${id}` }>
                      <img
                        data-testid={ `${index}-horizontal-image` }
                        src={ image }
                        alt="imagem da receita"
                      />
                    </Link>
                  </div>
                  <div className="infos-foods">
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${area} - ${category}`}
                    </p>
                    {/* <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {area}
                    </p> */}
                    <Link to={ `/comidas/${id}` }>
                      <p
                        data-testid={ `${index}-horizontal-name` }
                      >
                        {name}
                      </p>
                    </Link>
                    <button
                      type="button"
                      onClick={ () => handleShareRecipe(id, type) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt="share icon"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={ () => removeFavoriteRecipe(id) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ blackHeartIcon }
                        alt="blackHeart icon"
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <div key={ id }>
                  <div className="image-recipe">
                    <Link to={ `/bebidas/${id}` }>
                      <img
                        data-testid={ `${index}-horizontal-image` }
                        src={ image }
                        alt="imagem da receita"
                      />
                    </Link>
                  </div>
                  <div className="infos-drinks">
                    <Link to={ `/bebidas/${id}` }>
                      <p
                        data-testid={ `${index}-horizontal-name` }
                      >
                        {name}
                      </p>
                    </Link>
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {alcoholicOrNot}
                    </p>
                    <button
                      type="button"
                      onClick={ () => handleShareRecipe(id, type) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ shareIcon }
                        alt="share icon"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={ () => removeFavoriteRecipe(id) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ blackHeartIcon }
                        alt="blackHeart icon"
                      />
                    </button>
                  </div>
                </div>
              )
            ))
        }
      </div>
    );
  }
  return (
    <div>
      <Header />
      <h1>Não há receitas favoritas</h1>
    </div>
  );
}

export default FavoriteRecipes;
