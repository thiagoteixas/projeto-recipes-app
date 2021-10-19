import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import Footer from '../components/Footer';

import {
  fetchFullMealsList,
  fetchMealsAreas,
  fetchMealsByArea,
} from '../services/api';

function ExploreArea() {
  const [areas, setAreas] = useState();
  const [meals, setMeals] = useState();

  useEffect(() => {
    async function callFetch() {
      const areaArr = await fetchMealsAreas();
      const mealsArr = await fetchFullMealsList();

      setAreas(areaArr);
      setMeals(mealsArr);
    }

    callFetch();
  }, []);

  function searchHandler(results) {
    setMeals(results);
  }

  async function filterHandler(e) {
    const { value } = e.target;

    console.log(value);

    if (value === 'All') return setMeals(await fetchFullMealsList());

    setMeals((await fetchMealsByArea(value)));
  }

  return (
    <div className="explore-area">
      <Header onSearch={ searchHandler } />

      <select onChange={ filterHandler } data-testid="explore-by-area-dropdown">
        <option
          name="All"
          data-testid="All-option"
        >
          All
        </option>
        { areas && (
          areas.map((el, i) => (
            <option
              key={ i }
              onSelect={ filterHandler }
              data-testid={ `${el.strArea}-option` }
              name={ el.strArea }
            >
              {el.strArea}
            </option>
          ))
        ) }
      </select>

      { meals && <RecipesList list={ meals } category="meals" /> }

      <Footer />
    </div>
  );
}

export default ExploreArea;
