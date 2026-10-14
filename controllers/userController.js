import Hojas from "../models/Hojas.js";
import Categorias from "../models/Categorias.js";
import Pagadores from "../models/Pagadores.js";
import Gasto from "../models/Gasto.js";
import Ingreso from "../models/Ingreso.js";

const getUserSheets = async (req, res) => {
  const { user } = req.params;

  if (user !== req.user._id.toString()) {
    const error = new Error("Acceso denegado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const query = { user };
    const sheets = await Hojas.find(query).sort({ date: "asc" });

    res.json(sheets);
  } catch (error) {
    console.log(error);
  }
};

const getUserCategories = async (req, res) => {
  const { user } = req.params;

  if (user !== req.user._id.toString()) {
    const error = new Error("Acceso denegado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const query = { user, isActive: true };
    const categories = await Categorias.find(query);

    res.json(categories);
  } catch (error) {
    console.log(error);
  }
};

const getUserPayers = async (req, res) => {
  const { user } = req.params;

  if (user !== req.user._id.toString()) {
    const error = new Error("Acceso denegado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const query = { user, isActive: true };
    const payers = await Pagadores.find(query);

    res.json(payers);
  } catch (error) {
    console.log(error);
  }
};

const getUserFixedExpenses = async (req, res) => {
  const { user, sheetId } = req.params;

  if (user !== req.user._id.toString()) {
    const error = new Error("Acceso denegado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const query = { sheetId, type: "fixed" };
    const fixedEspenses = await Gasto.find(query)
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "payer",
        select: "name",
      });

    res.json(fixedEspenses);
  } catch (error) {
    console.log(error);
  }
};

const getUserVariableExpenses = async (req, res) => {
  const { user, sheetId } = req.params;

  if (user !== req.user._id.toString()) {
    const error = new Error("Acceso denegado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const query = { sheetId, type: "variable" };
    const fixedEspenses = await Gasto.find(query)
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "payer",
        select: "name",
      });

    res.json(fixedEspenses);
  } catch (error) {
    console.log(error);
  }
};

const getUserCashExpenses = async (req, res) => {
  const { user, sheetId } = req.params;

  if (user !== req.user._id.toString()) {
    const error = new Error("Acceso denegado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const query = { sheetId, type: "cash" };
    const fixedEspenses = await Gasto.find(query)
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "payer",
        select: "name",
      });

    res.json(fixedEspenses);
  } catch (error) {
    console.log(error);
  }
};

const getUserIncomes = async (req, res) => {
  const { user, sheetId } = req.params;

  if (user !== req.user._id.toString()) {
    const error = new Error("Acceso denegado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const query = { sheetId };
    const incomes = await Ingreso.find(query);

    res.json(incomes);
  } catch (error) {
    console.log(error);
  }
};

const createPayer = async (req, res) => {
  const payer = req.body;
  payer.user = req.user._id.toString();

  try {
    const newPayer = new Pagadores(sheet);
    const result = await newPayer.save();

    res.json({
      msg: "Pagador creada correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

const createCategory = async (req, res) => {
  const category = req.body;
  category.user = req.user._id.toString();

  try {
    const newCategory = new Categorias(sheet);
    const result = await newCategory.save();

    res.json({
      msg: "Categoría creada correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  getUserSheets,
  getUserCategories,
  getUserPayers,
  createPayer,
  createCategory,
  getUserFixedExpenses,
  getUserVariableExpenses,
  getUserCashExpenses,
  getUserIncomes,
};
