import { useState } from "react";

//                Filtro por DIET                  //---------------

const filterByDiet = (recipes) => {
  const [recipesByDiet, setRecipesForDiet] = useState(recipes);

  const diet = useSelector((state) => state.filterByDiet);

  diet === "All Diets"
    ? setRecipesForDiet(recipes)
    : setRecipesForDiet(
        recipes.diet((recipe) =>
          recipe.diets.some((diet) => diet.toLowerCase() === diet.toLowerCase())
        )
      );
};

export default filterByDiet;