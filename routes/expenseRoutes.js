import express from "express";
import {
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, createExpense);

router
  .route("/:sheetId/:expenseId")
  .put(authMiddleware, updateExpense)
  .delete(authMiddleware, deleteExpense);

export default router;
