import mongoose from 'mongoose';

const plantillasSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorias',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
})

const Plantillas = mongoose.model('Plantillas', plantillasSchema);

export default Plantillas;