import React from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/card.css';

function Card(name, image, id, { i, category }) {
  const history = useHistory();
  const recipeType = category === 'meals' ? 'comidas' : 'bebidas';

  return (
    <div
      key={ i }
      onClick={ () => history.push(`/${recipeType}/${id}`) }
      data-testid={ `${i}-recipe-card` }
      className="card"
      tabIndex="-1"
      role="button"
      onKeyPress={ () => console.log(1) }
    >
      <img data-testid={ `${i}-card-img` } src={ image } alt="ab" />
      <h4 data-testid={ `${i}-card-name` }>
        {name}
      </h4>
    </div>
  );
}

export default Card;
