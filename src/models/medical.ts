import { Schema, model, models } from 'mongoose'

const medicalSchema = new Schema({
    athlete: {
        identification: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        lastname1: {
            type: String,
            required: true,
        },
        lastname2: {
            type: String,
            required: true,
        },
        birth: {
            type: Date,
            required: true,
        },
    },
    doctor: {
        identification: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        lastname1: {
            type: String,
            required: true,
        },
        lastname2: {
            type: String,
            required: true,
        }
    },
    lesion: {
        area: {
            type: String,
            required: true,
        },
        tipo: {
            type: String,
            required: true,
        },
        grado: {
            type: Number,
            required: true,
        },
        especificacion: {
            type: String,
            required: true,
        },
        recuperacion: {
            type: String,
            required: true,
        },
        anotacion: {
            type: String,
            required: false,
        },
        recomendacion: {
            type: String,
            required: false,
        }
    },
    sport: {
        name: {
            type: String,
            required: true,
        },
        modality: {
            type: String,
            required: true,
        }
    },
    active: {
        type: Boolean,
        require: true
    }

}, {
    timestamps: true,
}
)

const Medical = models.Medical || model('Medical', medicalSchema);
export default Medical;