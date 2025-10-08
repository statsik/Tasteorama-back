import createHttpError from 'http-errors';

import { ROLES } from '../constants/index.js';
import { RecipesCollection } from '../db/models/recipes.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }

    const { role } = user;
    if (roles.includes(ROLES.TEACHER) && role === ROLES.TEACHER) {
      next();
      return;
    }

    if (roles.includes(ROLES.PARENT) && role === ROLES.PARENT) {
      const { recipeId } = req.params;
      if (!recipeId) {
        next(createHttpError(403));
        return;
      }

      const recipe = await RecipesCollection.findOne({
        _id: recipeId,
        parentId: user._id,
      });

      if (recipe) {
        next();
        return;
      }
    }

    next(createHttpError(403));
  };
