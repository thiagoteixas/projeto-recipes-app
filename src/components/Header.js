import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import '../styles/header.css';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';

import createHeaderTitle from '../utils/createHeaderTitle';
import isPageSearchable from '../utils/isPageSearchable';

function Header({ onSearch }) {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const history = useHistory();

  const title = createHeaderTitle(history);
  const displaySearchButton = isPageSearchable(title);

  function handleProfile() {
    history.push('/perfil');
  }

  function searchHandler(results) {
    onSearch(results);
    setDisplaySearchBar(false);
  }

  return (
    <header data-testid="main-header">
      <section>
        <button
          onClick={ handleProfile }
          type="button"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile icon"
          />
        </button>
        <h1
          data-testid="page-title"
        >
          { title }
        </h1>
        { displaySearchButton ? (
          <button
            onClick={ () => setDisplaySearchBar(!displaySearchBar) }
            type="button"
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search icon"
            />
          </button>
        ) : <button type="button">{' '}</button>}
      </section>
      {displaySearchBar && <Search onSearch={ searchHandler } page={ title } />}
    </header>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
