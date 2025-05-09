import Categorias from "../models/Categorias.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

const createCategory = async (req, res) => {
  const category = req.body;
  category.user = req.user._id.toString();

  try {
    const newCategory = new Categorias(category);
    const result = await newCategory.save();

    res.json({
      msg: "Categoría creada correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

const removeCategory = async (req, res) => {
  const { id } = req.params;

  // Validar un object id
  if (validateObjectId(id, res)) return;

  // Validar si la categoria existe
  const category = await Categorias.findById(id);
  if (!category) {
    return handleNotFoundError("La categoría no existe.", res);
  }

  // Validar si el usuario es el dueño de la categoria
  if (category.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permiso para acceder a esta categoría.");
    return res.status(403).json({
      msg: error.message,
    });
  }

  try {
    await category.deleteOne();

    res.json({
      msg: "Categoria eliminada correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

export { createCategory, removeCategory };
