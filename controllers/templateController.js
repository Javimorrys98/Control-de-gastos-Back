import Plantillas from "../models/Plantillas.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

const createTemplate = async (req, res) => {
  const template = req.body;
  template.user = req.user._id.toString();

  try {
    const newTemplate = new Plantillas(template);
    const result = await newTemplate.save();

    res.json({
      msg: "Plantilla creada correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

const removeTemplate = async (req, res) => {
  const { id } = req.params;

  // Validar un object id
  if (validateObjectId(id, res)) return;

  // Validar si la plantilla existe
  const template = await Plantillas.findById(id);
  if (!template) {
    return handleNotFoundError("La plantilla no existe.", res);
  }

  // Validar si el usuario es el dueño de la plantilla
  if (template.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permiso para acceder a esta plantilla.");
    return res.status(403).json({
      msg: error.message,
    });
  }

  try {
    // Desactivar la plantilla
    template.isActive = false;
    await template.save();

    res.json({
      msg: "Plantilla eliminada correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

export { createTemplate, removeTemplate };
