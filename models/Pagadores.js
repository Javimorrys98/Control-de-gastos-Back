import mongoose from 'mongoose';

const pagadoresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true,
    }
})

const Pagadores = mongoose.model('Pagadores', pagadoresSchema);

export default Pagadores;