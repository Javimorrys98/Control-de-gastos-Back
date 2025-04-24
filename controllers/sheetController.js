import Hojas from "../models/Hojas.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

const createSheet = async (req, res) => {
  const sheet = req.body;
  sheet.user = req.user._id.toString();

  try {
    const newSheet = new Hojas(sheet);
    const result = await newSheet.save();

    res.json({
      msg: "Hoja creada correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteSheet = async (req, res) => {
  const { id } = req.params;

  // Validar un object id
  if (validateObjectId(id, res)) return;

  // Validar si la hoja existe
  const sheet = await Hojas.findById(id);
  if (!sheet) {
    return handleNotFoundError("La hoja no existe.", res);
  }

  // Validar si el usuario es el dueño de la hoja
  if (sheet.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permiso para acceder a esta hoja.");
    return res.status(403).json({
      msg: error.message,
    });
  }

  try {
    await sheet.deleteOne();

    res.json({
      msg: "Hoja eliminada correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

export { createSheet, deleteSheet };
