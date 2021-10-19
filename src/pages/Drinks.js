import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Header from '../components/Header';
import Filters from '../components/Filters';
import RecipesList from '../components/RecipesList';
import Footer from '../components/Footer';

import {
  fetchDrinksByCategory,
  fetchFullDrinksList,
  fetchDrinksByIngredient,
} from '../services/api';

function Drinks() {
  const [drinksList, setDrinksList] = useState([]);
  const ingredient = new URLSearchParams(useLocation().search).get('ingredient');

  useEffect(() => {
    const callDrinksFetch = async () => {
      if (ingredient) return setDrinksList(await fetchDrinksByIngredient(ingredient));

      const list = await fetchFullDrinksList();
      setDrinksList(list);
    };
    callDrinksFetch();
  }, [ingredient]);

  function filterHandler(filter) {
    if (!filter || filter === 'all') {
      return fetchFullDrinksList().then((list) => setDrinksList(list));
    }

    if (filter) fetchDrinksByCategory(filter).then((list) => setDrinksList(list));
  }

  function searchHandler(results) {
    setDrinksList(results);
  }

  return (
    <div className="drinks-page">
      <Header onSearch={ searchHandler } />
      <Filters category="drinks" onFilter={ filterHandler } />
      { drinksList && (
        <RecipesList list={ drinksList } category="drinks" onFilter={ filterHandler } />
      ) }
      <Footer />
    </div>
  );
}

export default Drinks;
