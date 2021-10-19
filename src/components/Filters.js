import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchCategories } from '../services/api';
import normalizeCategory from '../utils/normalizeCategory';

const MAX_CATEGORIES_PER_PAGE = 5;

function Filters({ category, onFilter }) {
  const [categories, setCategories] = useState();
  const [filter, setFilter] = useState();

  useEffect(() => {
    async function callFetch() {
      const arr = await fetchCategories(category);
      setCategories(arr.slice(0, MAX_CATEGORIES_PER_PAGE));
    }

    callFetch();
  }, [category]);

  function handleFilter(e) {
    const { name } = e.target;

    if (!filter) {
      setFilter(name);
      return onFilter(name);
    }

    if (name === filter) {
      setFilter('');
      return onFilter('');
    }

    setFilter(name);
    onFilter(name);
  }

  return (
    <section className="category-list">
      { categories && categories.map(({ strCategory }, i) => (
        <button
          key={ i }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ handleFilter }
          name={ strCategory }
          className={ strCategory === filter ? 'highlight' : '' }
        >
          { normalizeCategory(strCategory) }
        </button>
      )) }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleFilter }
        name="all"
        className={ filter === 'all' ? 'highlight' : '' }
      >
        All
      </button>
    </section>
  );
}

Filters.propTypes = {
  category: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default Filters;
