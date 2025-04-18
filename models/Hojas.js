import mongoose from "mongoose";

const hojaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})

const Hoja = mongoose.model("Hojas", hojaSchema);

export default Hoja;