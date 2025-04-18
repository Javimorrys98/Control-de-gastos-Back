import mongoose from "mongoose";

const gastoschema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorias"
    },
    amount: {
        type: Number,
    },
    payer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pagadores"
    },
    fixed: {
        type: Boolean
    },
    sheetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hojas"
    },
})

const Gasto = mongoose.model("Gastos", gastoschema);

export default Gasto;