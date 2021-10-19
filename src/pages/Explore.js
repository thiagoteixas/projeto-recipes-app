import React from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/explore.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorer() { // Função pagina explorar principal
  const history = useHistory();

  const exploreFoods = () => {
    history.push('/explorar/comidas');
  };

  const exploreDrinks = () => {
    history.push('/explorar/bebidas');
  };

  return (
    <div>
      <Header onSearch={ () => false } />
      <div className="explore-page">
        <button
          data-testid="explore-food"
          type="button"
          onClick={ exploreFoods }
          className="btn-explore"
        >
          Explorar Comidas
        </button>
        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ exploreDrinks }
          className="btn-explore"
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explorer;
