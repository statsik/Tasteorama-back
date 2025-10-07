import { createRecipes, deleteRecipe, editRecipe } from '../services/recipes.js';
import { getAllRecipes, getRecipesById } from '../services/recipes.js';
import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const createRecipeController = async (req, res) => {
  const recipe = await createRecipes(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a recipe!`,
    data: recipe,
  });
};

export const getRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const recipes = await getAllRecipes({
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  res.json({
    status: 200,
    message: 'Successfully found recipes!',
    data: recipes,
  });
};

export const getRecipeByIdController = async (req, res, next) => {
  const { recipeId } = req.params;
  const recipe = await getRecipesById(recipeId);

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

export const patchRecipeController = async (req, res, next) => {
    const { recipeId } = req.params;
    const { _id: userId } = req.user;
    const photo = req.file;
    let photoUrl;

    if (photo) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const updatedData = {
        ...req.body,
    };

    if (photoUrl) {
        updatedData.photo = photoUrl;
    }

    const recipe = await editRecipe(
        recipeId, userId, updatedData
    );

    if (!recipe) {
        next(createHttpError(404, 'Recipe not found'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully patched a recipe!`,
        data: recipe
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
