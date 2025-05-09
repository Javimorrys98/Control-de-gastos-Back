import mongoose from "mongoose";

const gastoschema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorias",
  },
  amount: {
    type: Number,
  },
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pagadores",
  },
  type: {
    type: String,
  },
  sheetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hojas",
  },
});

const Gasto = mongoose.model("Gastos", gastoschema);

export default Gasto;
