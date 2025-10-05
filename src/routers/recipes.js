import { Router } from 'express';
import {
  getRecipesController,
  getRecipeByIdController,
} from '../controllers/recipes.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createRecipes } from '../services/recepies.js';

const routerRecipes = Router();

routerRecipes.get('/recipes', ctrlWrapper(getRecipesController));

routerRecipes.get('/recipes/:recipeId', ctrlWrapper(getRecipeByIdController));

routerRecipes.post('/recipes', ctrlWrapper(createRecipes));

export default routerRecipes;
