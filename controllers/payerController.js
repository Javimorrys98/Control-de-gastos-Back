import Pagadores from "../models/Pagadores.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

const createPayer = async (req, res) => {
  const payer = req.body;
  payer.user = req.user._id.toString();

  try {
    const newPayer = new Pagadores(payer);
    const result = await newPayer.save();

    res.json({
      msg: "Pagador creada correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

const removePayer = async (req, res) => {
  const { id } = req.params;

  // Validar un object id
  if (validateObjectId(id, res)) return;

  // Validar si el pagador existe
  const payer = await Pagadores.findById(id);
  if (!payer) {
    return handleNotFoundError("El pagador no existe.", res);
  }

  // Validar si el usuario es el dueño del pagador
  if (payer.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permiso para acceder a este pagador.");
    return res.status(403).json({
      msg: error.message,
    });
  }

  try {
    await payer.deleteOne();

    res.json({
      msg: "Pagador eliminado correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

export { createPayer, removePayer };
