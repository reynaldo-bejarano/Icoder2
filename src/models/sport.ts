import { Schema, model, models } from 'mongoose'

const sportSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,

    }, modality: {
        type: Array,
        require: true
    }

}, {
    timestamps: true,
}
)

const Sport = models.Sport || model('Sport', sportSchema);
export default Sport;