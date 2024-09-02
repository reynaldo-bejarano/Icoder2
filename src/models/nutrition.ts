import { Schema, model, models } from "mongoose";

const nutritionSchema = new Schema(
  {
    athlete_id: {
      type: Number,
      required: true,
    },
    1: {
      day: {
        type: String,
        required: true,
      },
      breakfast: {
        type: String,
        required: false,
      },
      lunch: {
        type: String,
        required: false,
      },
      dinner: {
        type: String,
        required: false,
      },
      merienda: {
        type: String,
        required: false,
      },
      snack: {
        type: String,
        required: false,
      },
    },
    2: {
      day: {
        type: String,
        required: true,
      },
      breakfast: {
        type: String,
        required: false,
      },
      lunch: {
        type: String,
        required: false,
      },
      dinner: {
        type: String,
        required: false,
      },
      merienda: {
        type: String,
        required: false,
      },
      snack: {
        type: String,
        required: false,
      },
    },
    3: {
      day: {
        type: String,
        required: true,
      },
      breakfast: {
        type: String,
        required: false,
      },
      lunch: {
        type: String,
        required: false,
      },
      dinner: {
        type: String,
        required: false,
      },
      merienda: {
        type: String,
        required: false,
      },
      snack: {
        type: String,
        required: false,
      },
    },
    4: {
      day: {
        type: String,
        required: true,
      },
      breakfast: {
        type: String,
        required: false,
      },
      lunch: {
        type: String,
        required: false,
      },
      dinner: {
        type: String,
        required: false,
      },
      merienda: {
        type: String,
        required: false,
      },
      snack: {
        type: String,
        required: false,
      },
    },
    5: {
      day: {
        type: String,
        required: true,
      },
      breakfast: {
        type: String,
        required: false,
      },
      lunch: {
        type: String,
        required: false,
      },
      dinner: {
        type: String,
        required: false,
      },
      merienda: {
        type: String,
        required: false,
      },
      snack: {
        type: String,
        required: false,
      },
    },
    6: {
      day: {
        type: String,
        required: true,
      },
      breakfast: {
        type: String,
        required: false,
      },
      lunch: {
        type: String,
        required: false,
      },
      dinner: {
        type: String,
        required: false,
      },
      merienda: {
        type: String,
        required: false,
      },
      snack: {
        type: String,
        required: false,
      },
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Nutrition = models.Nutrition || model("Nutrition", nutritionSchema);
export default Nutrition;
