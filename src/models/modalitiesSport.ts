import { Schema, model, models } from 'mongoose'

const modalitiesSportSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    }, 
    sports_id: {
        type: Array,
        require: true
    }

}, {
    timestamps: true,
}
)

const ModalitiesSport = models.ModalitiesSport || model('ModalitiesSport', modalitiesSportSchema);
export default ModalitiesSport;