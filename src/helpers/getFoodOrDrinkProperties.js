const VIDEO_ID_INDEX = 32;

function getIngredientsAndMeasures(element) {
  let index = 1;
  let ingredients = [];
  let ingredientKey = `strIngredient${index}`;
  let measureKey = `strMeasure${index}`;

  for (let i = 0; element[measureKey]; i += 1) {
    ingredients = [
      ...ingredients,
      `${element[measureKey]} ${[element[ingredientKey]]}`,
    ];

    index += 1;

    ingredientKey = `strIngredient${index}`;

    measureKey = `strMeasure${index}`;
  }

  return ingredients;
}

function getFoodRecipe(food) {
  const ingredients = getIngredientsAndMeasures(food);

  const video = `https://www.youtube.com/embed/${food.strYoutube.slice(VIDEO_ID_INDEX)}`;

  return {
    name: food.strMeal,
    id: food.idMeal,
    image: food.strMealThumb,
    subCategory: food.strCategory,
    category: food.strCategory,
    alcoholicOrNot: '',
    area: 'Italian',
    ingredients,
    instructions: food.strInstructions,
    video,
  };
}

export function getDrinkRecipe(drink) {
  return {
    name: drink.strDrink,
    id: drink.idDrink,
    image: drink.strDrinkThumb,
    ingredients: getIngredientsAndMeasures(drink),
    instructions: drink.strInstructions,
    subCategory: drink.strAlcoholic,
    category: drink.strCategory,
    alcoholicOrNot: drink.strAlcoholic,
    area: '',
  };
}

export function getRecipe(consumable, category) {
  if (category === 'comida') return getFoodRecipe(consumable);
  if (category !== 'comida') return getDrinkRecipe(consumable);
}
