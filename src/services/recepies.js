import { RecipesCollection } from "../db/models/recepies";

export const createRecipes = async (recipe) => {
  const newRecipe = await RecipesCollection.create(recipe);
  return newRecipe;
};

export const getAllRecipes = async () => {
  const recipes = await RecipesCollection.find();
  return recipes;
};

export const getRecipesById = async (recipesId) => {
  const recipes = await RecipesCollection.findById(recipesId);
  return recipes;
};

export const editRecipe = async (recipeId, payload, options = {}) => {
  const editedRecipe = await RecipesCollection.findOneAndUpdate(
    { _id: recipeId },
    payload,
    {
      new: true,
      ...options,
    },
  );
  if (!editedRecipe) return null;
  return editedRecipe;
};

export const deleteRecipe = async (recipeId, userId) => {
  const recipe = await RecipesCollection.findOneAndDelete({
    _id: recipeId,
    userId
  });

  return recipe;
};
