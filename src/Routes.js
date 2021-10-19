import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import Details from './pages/Details';
import Explore from './pages/Explore';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import ExploreRecipes from './pages/ExploreRecipes';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreArea from './pages/ExploreArea';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDone from './components/RecipeDone';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Meals } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/comidas/:id" component={ Details } />
        <Route exact path="/comidas/:id/in-progress" component={ FoodInProgress } />
        <Route exact path="/bebidas/:id" component={ Details } />
        <Route exact path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route exact path="/explorar/comidas" component={ ExploreRecipes } />
        <Route exact path="/explorar/bebidas" component={ ExploreRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route exact path="/Receitas-feitas" component={ RecipeDone } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreIngredients }
        />
        <Route
          path="/explorar/comidas/area"
          component={ ExploreArea }
        />
        <Route
          path="/explorar/bebidas/area"
          render={ () => <h1>Not Found</h1> }
        />
      </Switch>
    </Router>
  );
}

export default Routes;
