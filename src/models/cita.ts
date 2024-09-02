import { Schema, model, models } from "mongoose";

const citaSchema = new Schema(
  {
    athlete_id: {
      type: Number,
      required: true,
      minLenght: [9, "Minimo 9 caracteres"],
    },
    user_id: {
      type: Number,
      required: true,
      minLenght: [9, "Minimo 9 caracteres"],
    },
    occupation: {
      type: String,
      required: true,
      minLenght: [3, "Minimo 3 caracteres"],
    },
    specialist: {
      type: String,
      required: true,
      minLenght: [3, "Minimo 3 caracteres"],
    },
    athlete_name: {
      type: String,
      required: true,
      minLenght: [3, "Minimo 3 caracteres"],
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
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

const Cita = models.Cita || model("Cita", citaSchema);
export default Cita;
