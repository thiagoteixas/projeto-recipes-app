import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <section>
        <Link to="/bebidas">
          <button
            type="button"
          >
            <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="Drink Icon" />
          </button>
        </Link>

        <Link to="/explorar">
          <button
            type="button"
          >
            <img
              src={ exploreIcon }
              data-testid="explore-bottom-btn"
              alt="Explore Icon"
            />
          </button>
        </Link>

        <Link to="/comidas">
          <button
            type="button"
          >
            <img src={ mealIcon } data-testid="food-bottom-btn" alt="Meal Icon" />
          </button>
        </Link>
      </section>
    </footer>
  );
}

export default Footer;
