import { createRecipes, deleteRecipe, editRecipe } from '../services/recepies.js';
import { getAllRecipes, getRecipeById } from '../services/recipes.js';
import createHttpError from 'http-errors';

export const createRecipeController = async (req, res) => {
  const recipe = await createRecipes(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: recipe,
  });
};

export const getRecipesController = async (req, res) => {
  const recipes = await getAllRecipes();

  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data: recipes,
  });
};

export const getRecipeByIdController = async (req, res, next) => {
  const { recipeId } = req.params;
  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    throw createHttpError('Recipe not found');
  }

  res.json({
    status: 200,
    message: `Successfully found recipe with id ${recipeId}!`,
    data: recipe,
  });
};

export const editRecipeController = async (req, res, next) => {
    const { recipeId } = req.params;
    const { _id: userId } = req.user;
    const recipe = await editRecipe(recipeId, req.body, userId, {
        upsert: true,
    });

    if (!recipe) {
        next(createHttpError(404, 'Recipe not found'));
        return;
    }

    res.status(200).json({
        status: 200,
        message: "Successfully edited a recipe!",
        data: recipe,
    });
};

export const deleteRecipeController = async (req, res, next) => {
    const { recipeId } = req.params;
    const { _id: userId } = req.user;
    const recipe = await deleteRecipe(recipeId, userId);

    if (!recipe) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.status(204).send();
};
