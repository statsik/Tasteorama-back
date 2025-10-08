import { Router } from 'express';
import routerAuth from './auth.js';
import routerRecipes from './recipes.js';

const router = Router();

router.use('/recipes', routerRecipes);
router.use('/auth', routerAuth);

export default router;
