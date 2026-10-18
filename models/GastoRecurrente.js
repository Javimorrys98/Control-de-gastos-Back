import mongoose from "mongoose";

const gastosrecurrenteschema = new mongoose.Schema({
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
    default: "fixed",
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const GastoRecurrente = mongoose.model("GastosRecurrentes", gastosrecurrenteschema);

export default GastoRecurrente;
