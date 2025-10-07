import { SORT_ORDER } from "../constants/index.js";
import { RecipesCollection } from "../db/models/recipes.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const createRecipes = async (recipe) => {
  const newRecipe = await RecipesCollection.create(recipe);
  return newRecipe;
};

export const getAllRecipes = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const recipesQuery = RecipesCollection.find();
  const recipesCount = await RecipesCollection.find()
    .merge(recipesQuery )
    .countDocuments();

  const recipes = await recipesQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();

  const paginationData = calculatePaginationData(recipesCount, perPage, page);

  return {
    data: recipes,
    ...paginationData,
  };
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
