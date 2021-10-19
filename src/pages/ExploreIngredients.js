import React from 'react';

import Header from '../components/Header';
import IngredientsList from '../components/IngredientsList';
import Footer from '../components/Footer';

function ExploreIngredients() {
  return (
    <>
      <Header onSearch={ () => false } />
      <IngredientsList />
      <Footer />
    </>
  );
}

export default ExploreIngredients;
