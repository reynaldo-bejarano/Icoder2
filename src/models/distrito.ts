import { Schema, model, models } from 'mongoose'

const distritoSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    canton_id: {
        type: Number,
        required: true,
    },
   
}, {
    timestamps: true,
}
)

const Distrito = models.Distrito || model('Distrito', distritoSchema);
export default Distrito;