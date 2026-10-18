import GastoRecurrente from "../models/GastoRecurrente.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

const createRecurringExpense = async (req, res) => {
  const recurringExpense = req.body;
  recurringExpense.user = req.user._id.toString();

  try {
    const newRecurringExpense = new GastoRecurrente(recurringExpense);
    const result = await newRecurringExpense.save();

    res.json({
      msg: "Gasto recurrente creado correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

const removeRecurringExpense = async (req, res) => {
  const { id } = req.params;

  // Validar un object id
  if (validateObjectId(id, res)) return;

  // Validar si el gasto recurrente existe
  const recurringExpense = await GastoRecurrente.findById(id);
  if (!recurringExpense) {
    return handleNotFoundError("El gasto recurrente no existe.", res);
  }

  // Validar si el usuario es el dueño del gasto recurrente
  if (recurringExpense.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permiso para acceder a este gasto recurrente.");
    return res.status(403).json({
      msg: error.message,
    });
  }

  try {
    // Desactivar el gasto recurrente
    recurringExpense.isActive = false;
    await recurringExpense.save();

    res.json({
      msg: "Gasto recurrente eliminado correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

export { createRecurringExpense, removeRecurringExpense };
