import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getUserSheets,
  getUserCategories,
  getUserPayers,
  getUserFixedExpenses,
  getUserVariableExpenses,
  getUserCashExpenses,
  // getUserIncomes,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/:user/sheets").get(authMiddleware, getUserSheets);
router.route("/:user/categories").get(authMiddleware, getUserCategories);
router.route("/:user/payers").get(authMiddleware, getUserPayers);
router
  .route("/:user/:sheetId/fixed-expenses")
  .get(authMiddleware, getUserFixedExpenses);
router
  .route("/:user/:sheetId/variable-expenses")
  .get(authMiddleware, getUserVariableExpenses);
router
  .route("/:user/:sheetId/cash-expenses")
  .get(authMiddleware, getUserCashExpenses);
// router.route("/:user/incomes").get(authMiddleware, getUserIncomes);

export default router;
