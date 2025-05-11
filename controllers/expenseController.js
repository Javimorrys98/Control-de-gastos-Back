import Gasto from "../models/Gasto.js";
import Ingreso from "../models/Ingreso.js";
import Hojas from "../models/Hojas.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

const createExpense = async (req, res) => {
  const expense = req.body;
  expense.date = new Date(req.body.date);

  try {
    const newExpense = new Gasto(expense);
    const result = await newExpense.save();

    res.json({
      msg: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateExpense = async (req, res) => {};

const deleteExpense = async (req, res) => {
  const { sheetId, expenseId } = req.params;

  // Validar un object id
  if (validateObjectId(sheetId, res)) return;
  if (validateObjectId(expenseId, res)) return;

  // Validar si el gasto existe
  const expense = await Gasto.findById(expenseId);
  if (!expense) {
    return handleNotFoundError("El gasto no existe.", res);
  }

  // Validar si la hoja existe
  const sheet = await Hojas.findById(sheetId);
  if (!sheet) {
    return handleNotFoundError("La hoja no existe.", res);
  }

  // Validar si la hoja pertenece al usuario
  if (sheet.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permiso para acceder a esta hoja.");
    return res.status(403).json({
      msg: error.message,
    });
  }

  // Validar si el gasto pertenece a la hoja
  if (expense.sheetId.toString() !== sheetId) {
    const error = new Error("El gasto no pertenece a esta hoja.");
    return res.status(403).json({
      msg: error.message,
    });
  }

  try {
    await expense.deleteOne();

    res.json({
      msg: "Gasto eliminado correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

const createIncome = async (req, res) => {
  const income = req.body;

  try {
    const newIncome = new Ingreso(income);
    const result = await newIncome.save();

    res.json({
      msg: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateIncome = async (req, res) => {};

const deleteIncome = async (req, res) => {
  const { sheetId, incomeId } = req.params;

  // Validar un object id
  if (validateObjectId(sheetId, res)) return;
  if (validateObjectId(incomeId, res)) return;

  // Validar si el ingreso existe
  const income = await Ingreso.findById(incomeId);
  if (!income) {
    return handleNotFoundError("El ingreso no existe.", res);
  }
  // Validar si la hoja existe
  const sheet = await Hojas.findById(sheetId);
  if (!sheet) {
    return handleNotFoundError("La hoja no existe.", res);
  }
  // Validar si la hoja pertenece al usuario
  if (sheet.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permiso para acceder a esta hoja.");
    return res.status(403).json({
      msg: error.message,
    });
  }
  // Validar si el ingreso pertenece a la hoja
  if (income.sheetId.toString() !== sheetId) {
    const error = new Error("El ingreso no pertenece a esta hoja.");
    return res.status(403).json({
      msg: error.message,
    });
  }
  try {
    await income.deleteOne();

    res.json({
      msg: "Ingreso eliminado correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  createExpense,
  updateExpense,
  deleteExpense,
  createIncome,
  updateIncome,
  deleteIncome,
};
