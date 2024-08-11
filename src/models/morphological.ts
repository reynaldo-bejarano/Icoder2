import { Schema, model, models } from 'mongoose'

const morphologicalSchema = new Schema({
    athlete_id: {
        type: Number,
        required: true,
        unique: true,
      },
      basic: {
        height: {
          type: Number,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
        IMC: {
          type: Number,
          required: true,
        },
      },
      percentage: {
        fat: {
          type: Number,
          required: true,
        },
        muscle: {
          type: Number,
          required: true,
        },
        water: {
          type: Number,
          required: true,
        },
      },
      circumference: {
        waist: {
          type: Number,
          required: true,
        },
        hip: {
          type: Number,
          required: true,
        },
      },
      arms: {
        aright: {
          type: Number,
          required: true,
        },
        aleft: {
          type: Number,
          required: true,
        },
      },
      legs: {
        lright: {
          type: Number,
          required: true,
        },
        lleft: {
          type: Number,
          required: true,
        },
      },
      gastrocnemius: {
        gright: {
          type: Number,
          required: true,
        },
        gleft: {
          type: Number,
          required: true,
        },
      },
   
}, {
    timestamps: true,
}
)

const Morphological = models.Morphological || model('Morphological', morphologicalSchema);
export default Morphological;