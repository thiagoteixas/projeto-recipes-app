import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import Header from '../components/Header';
import Filters from '../components/Filters';
import RecipesList from '../components/RecipesList';
import Footer from '../components/Footer';

import {
  fetchFullMealsList,
  fetchMealsByCategory,
  fetchMealsByIngredient,
} from '../services/api';

function Meals() {
  const [mealList, setMealList] = useState([]);
  const ingredient = new URLSearchParams(useLocation().search).get('ingredient');

  useEffect(() => {
    const callMealsFetch = async () => {
      if (ingredient) return setMealList(await fetchMealsByIngredient(ingredient));

      const list = await fetchFullMealsList();
      setMealList(list);
    };

    callMealsFetch();
  }, [ingredient]);

  function filterHandler(filter) {
    if (!filter || filter === 'all') {
      return fetchFullMealsList().then((list) => setMealList(list));
    }

    if (filter) fetchMealsByCategory(filter).then((list) => setMealList(list));
  }

  function searchHandler(results) {
    setMealList(results);
  }

  return (
    <div className="meals-page">
      <Header onSearch={ searchHandler } />
      <Filters category="meals" onFilter={ filterHandler } />
      { mealList && (
        <RecipesList list={ mealList } category="meals" />
      ) }
      <Footer />
    </div>
  );
}

export default Meals;
