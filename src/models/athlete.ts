import { Schema, model, models } from 'mongoose'

const athleteSchema = new Schema({
    identification: {
        type: Number,
        unique: true,
        required: true,
        minLenght: [9, "Minimo 9 caracteres"],
    },
    name: {
        type: String,
        required: true,
        minLenght: [3, "Minimo 3 caracteres"],
        trim: true,
    },
    lastname1: {
        type: String,
        required: true,
        minLenght: [3, "Minimo 3 caracteres"],
        trim: true,
    },
    lastname2: {
        type: String,
        required: true,
        minLenght: [3, "Minimo 3 caracteres"],
        trim: true,
    },
    email: {
        type: String,
        unique: [true, "El correo ya existe"],
        required: [true, "Email es requerido"],

        // match: /[a - zA - Z0 -9_] + ([.][a - zA - Z0 -9_] +) * @[a - zA - Z0 -9_] + ([.][a - zA - Z0 -9_] +) * [.][a - zA - Z]{ 2, 5}/,
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"],
        select: false,
        minLenght: [6, "Minimo 6 caracteres"],
        trim: true,
    },
    role: {
        type: String,
        required: true,
    },
    birth: {
        type: Date,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        provincia_id: {
            type: String,
            required: true,
        },
        canton_id: {
            type: Number,
            required: true,
        },
        distrito_id: {
            type: Number,
            required: true,
        },
    }
    ,
    activity: {
        sport_id: {
            type: Number,
            required: true,
        },
        modality_id: {
            type: Number,
            required: true,
        },
        intensity: {
            type: Number,
            required: true,
        },
    },
    active: {
        type: Boolean,
        require: true
    }

}, {
    timestamps: true,
}
)

const Athlete = models.Athlete || model('Athlete', athleteSchema);
export default Athlete;