const mealListEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const drinkListEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const MEAL_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINK_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const MEAL_INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const DRINK_INGREDIENTS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const MAX_RECOMMENDATIONS = 6;

export function getMealsEndpoint(type, value) {
  switch (type) {
  case 'Ingrediente':
    return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
  case 'Nome':
    return `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
  case 'Primeira letra':
    return `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;

  default: throw new Error('Cant generate API_URL: Invalid params');
  }
}

export function getDrinksEndpoint(type, value) {
  switch (type) {
  case 'Ingrediente':
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
  case 'Nome':
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
  case 'Primeira letra':
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`;

  default: throw new Error('Cant generate API_URL: Invalid params');
  }
}

export function fetchMeals(type, value) {
  const API_URL = getMealsEndpoint(type, value);

  return fetch(API_URL)
    .then((res) => res.json())
    .then((data) => data.meals);
}

export function fetchFullMealsList() {
  return fetch(mealListEndPoint)
    .then((res) => res.json())
    .then((data) => data.meals);
}

export function fetchDrinks(type, value) {
  const API_URL = getDrinksEndpoint(type, value);

  return fetch(API_URL)
    .then((res) => res.json())
    .then((data) => data.drinks);
}

export function fetchFullDrinksList() {
  return fetch(drinkListEndPoint)
    .then((res) => res.json())
    .then((data) => data.drinks);
}

export function fetchResults(type, value, page) {
  if (page.includes('comidas')) return fetchMeals(type, value);
  if (page.includes('bebidas')) return fetchDrinks(type, value);
}

export function fetchMealsCategories() {
  return fetch(MEAL_CATEGORIES_URL)
    .then((res) => res.json())
    .then((data) => data.meals);
}

export function fetchDrinksCategories() {
  return fetch(DRINK_CATEGORIES_URL)
    .then((res) => res.json())
    .then((data) => data.drinks);
}

export function fetchCategories(category) {
  if (category === 'meals') return fetchMealsCategories();
  if (category === 'drinks') return fetchDrinksCategories();
}

export function fetchMealsIngredients() {
  return fetch(MEAL_INGREDIENTS_URL)
    .then((res) => res.json())
    .then((data) => data.meals);
}

export function fetchDrinksIngredients() {
  return fetch(DRINK_INGREDIENTS_URL)
    .then((res) => res.json())
    .then((data) => data.drinks);
}

export function fetchIngredients(isMeal) {
  if (isMeal) return fetchMealsIngredients();
  if (!isMeal) return fetchDrinksIngredients();
}

export function fetchMealsByCategory(filter) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`)
    .then((res) => res.json())
    .then((data) => data.meals);
}

export function fetchDrinksByCategory(filter) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`)
    .then((res) => res.json())
    .then((data) => data.drinks);
}

export function fetchMealById(id) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => data.meals[0]);
}

export function fetchDrinkById(id) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => data.drinks[0]);
}

export function fetchRecipeById(type, id) {
  if (type === 'comida') return fetchMealById(id);
  if (type === 'bebida') return fetchDrinkById(id);
}

function fetchDrinksRecommendations() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((res) => res.json())
    .then((data) => (data.drinks.slice(0, MAX_RECOMMENDATIONS)));
}

function fetchMealsRecommendations() {
  return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((res) => res.json())
    .then((data) => (data.meals.slice(0, MAX_RECOMMENDATIONS)));
}

export function fetchRecommendations(type) {
  if (type === 'comida') return fetchDrinksRecommendations();
  if (type === 'bebida') return fetchMealsRecommendations();
}

export function fetchRandomMeal() {
  return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((data) => data.meals[0].idMeal);
}

export function fetchRandomDrink() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((data) => data.drinks[0].idDrink);
}

export function fetchRandom(isMeal) {
  if (isMeal) return fetchRandomMeal();
  if (!isMeal) return fetchRandomDrink();
}

export function fetchMealsByIngredient(ingredient) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((res) => res.json())
    .then((data) => data.meals);
}

export function fetchDrinksByIngredient(ingredient) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((res) => res.json())
    .then((data) => data.drinks);
}

export function fetchMealsAreas() {
  return fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((res) => res.json())
    .then((data) => data.meals);
}

export function fetchMealsByArea(area) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then((res) => res.json())
    .then((data) => data.meals);
}
