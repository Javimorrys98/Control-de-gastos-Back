import mongoose from "mongoose";

const ingresoschema = new mongoose.Schema({
    date: {
        type: Date,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
    },
    sheetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hojas"
    },
})

const Ingreso = mongoose.model("Ingresos", ingresoschema);

export default Ingreso;