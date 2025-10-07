import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    prepTimeMinutes: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },

    ingredients: {
      type: [ingredientSchema],
      required: true,
    },

    instructionSteps: {
      type: [String],
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RecipesCollection = model('Recipe', recipeSchema);
