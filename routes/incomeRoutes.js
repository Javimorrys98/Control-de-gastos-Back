import express from "express";
import {
  createIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/expenseController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, createIncome);

router
  .route("/:sheetId/:incomeId")
  .put(authMiddleware, updateIncome)
  .delete(authMiddleware, deleteIncome);

export default router;
