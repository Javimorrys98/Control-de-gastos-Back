import mongoose from 'mongoose';

const categoriasSchema = new mongoose.Schema({
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

const Categorias = mongoose.model('Categorias', categoriasSchema);

export default Categorias;