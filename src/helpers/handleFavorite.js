export default function handleFavorite(paramsOfFavorite) {
  const { id, FAV_RECIPE, setFavorite, favorite } = paramsOfFavorite;
  const recipe = { id, ...FAV_RECIPE };
  const localFavoritesFood = localStorage.getItem('favoriteRecipes');
  if (localFavoritesFood) {
    const localArray = JSON.parse(localFavoritesFood);
    const isFavorite = localArray.some((el) => (el.id === id));
    if (isFavorite) {
      const filteredArray = localArray.filter((el) => (el.id !== id));
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredArray));
      return setFavorite(!favorite);
    }
    const newFavorites = JSON.stringify([...localArray, recipe]);
    localStorage.setItem('favoriteRecipes', newFavorites);
    setFavorite(!favorite);
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
    setFavorite(!favorite);
  }
}
