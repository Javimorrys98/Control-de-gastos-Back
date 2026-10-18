import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createRecurringExpense, removeRecurringExpense } from "../controllers/recurringExpenseController.js";

const router = express.Router();

router.route("/").post(authMiddleware, createRecurringExpense);

router.route("/:id/remove").patch(authMiddleware, removeRecurringExpense);

export default router;
