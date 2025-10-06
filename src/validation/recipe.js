import Joi from 'joi';
import { ingredientSchema } from '../db/models/recepies';

export const createRecipeSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'any.required': 'Recipe name is required.',
      'string.min': 'Recipe name must be at least 3 characters long.',
    }),

  description: Joi.string()
    .min(10)
    .required()
    .messages({
      'any.required': 'Description is required.',
      'string.min': 'Description must be at least 10 characters long.',
    }),

  prepTimeMinutes: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'any.required': 'Preparation time is required.',
      'number.min': 'Preparation time must be a positive number.',
      'number.integer': 'Preparation time must be a whole number (in minutes).',
    }),

  category: Joi.string()
    .valid('breakfast', 'lunch', 'dinner', 'snack', 'dessert')
    .required()
    .messages({
      'any.required': 'Category is required.',
      'any.only': 'Category must be one of the allowed values.',
    }),

  amount: Joi.string()
    .required()
    .messages({
      'any.required': 'The "amount" (yield) field is required.',
    }),

  calories: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'any.required': 'Calorie count is required.',
      'number.min': 'Calories cannot be negative.',
    }),

  ingredients: Joi.array()
    .items(Joi.object({
      item: Joi.string().trim().required().messages({
        'any.required': 'Ingredient name is required.',
        'string.empty': 'Ingredient name cannot be empty.',
      }),
      quantity: Joi.number().min(0).allow(null),
      unit: Joi.string().trim().required().messages({
        'any.required': 'Unit of measurement is required.',
        'string.empty': 'Unit of measurement cannot be empty.',
      }),
    }))
    .min(1)
    .required()
    .messages({
      'any.required': 'The list of ingredients is required.',
      'array.min': 'The list of ingredients cannot be empty.',
    }),

  instructionSteps: Joi.array()
    .items(Joi.string().min(5))
    .min(1)
    .required()
    .messages({
      'any.required': 'The list of instruction steps is required.',
      'array.min': 'Instructions must contain at least one step.',
    }),

  imageUrl: Joi.string()
    .uri()
    .required()
    .messages({
        'any.required': 'Image URL is required.',
        'string.uri': 'Image URL must be a valid URL format.',
    }),
});

export const updateRecipeSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),

  desc: Joi.string().min(10).optional(),

  prepTimeMinutes: Joi.number().integer().min(1).optional(),

  category: Joi.string().valid('breakfast', 'lunch', 'dinner', 'snack', 'dessert').optional(),

  amount: Joi.string().optional(),

  calories: Joi.number().integer().min(0).optional(),

  ingredients: Joi.array(ingredientSchema)
    .items()
    .min(1)
    .optional(),

  instructionSteps: Joi.array()
    .items(Joi.string().min(5))
    .min(1)
    .optional(),

  imageUrl: Joi.string()
    .uri()
    .optional()
    .messages({
        'string.uri': 'Image URL must be a valid URL format.',
    }),

})
.min(1)
.messages({
    'object.min': 'At least one field is required for update.',
});
