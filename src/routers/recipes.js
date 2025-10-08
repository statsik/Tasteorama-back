import { Router } from 'express';
import {
  getRecipesController,
  getRecipeByIdController,
} from '../controllers/recipes.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createRecipeController, deleteRecipeController, editRecipeController, patchRecipeController } from '../controllers/recipes.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createRecipeSchema, updateRecipeSchema } from '../validation/recipe.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const routerRecipes = Router();

routerRecipes.use(authenticate);

routerRecipes.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getRecipesController));


routerRecipes.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

routerRecipes.post('/', upload.single('photo'), validateBody(createRecipeSchema), ctrlWrapper(createRecipeController)),
routerRecipes.put('/:recipeId', upload.single('photo'), isValidId, ctrlWrapper(editRecipeController));
routerRecipes.patch('/:recipeId', upload.single('photo'), validateBody(updateRecipeSchema), isValidId, ctrlWrapper(patchRecipeController));
routerRecipes.delete('/:recipeId', isValidId, ctrlWrapper(deleteRecipeController));
export default routerRecipes;
