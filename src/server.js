import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllRecipes, getRecipesById } from './services/recipes.js';
import routerRecipes from './routers/recipes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/recipes', async (req, res) => {
    const recipes = await getAllRecipes();

    res.status(200).json({
      data: recipes,
    });
  });

  app.get('/recipes/:recipesId', async (req, res, next) => {
    const { recipesId } = req.params;
    const recipes = await getRecipesById(recipesId);

	if (!recipes) {
	  res.status(404).json({
		  message: 'Recipes not found'
	  });
	  return;
	}

    res.status(200).json({
        data: recipes,
      });
  });

  app.use(routerRecipes);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
