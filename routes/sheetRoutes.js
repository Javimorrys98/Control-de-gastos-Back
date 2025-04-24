import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createSheet, deleteSheet } from "../controllers/sheetController.js";

const router = express.Router();

router.route("/").post(authMiddleware, createSheet);

router.route("/:id").delete(authMiddleware, deleteSheet);

// router.route("/:sheet/variable").get(authMiddleware, getUserSheets);
// router.route("/:sheet/fixed").get(authMiddleware, getUserSheets);
// router.route("/:sheet/cash").get(authMiddleware, getUserSheets);
// router.route("/:sheet/income").get(authMiddleware, getUserSheets);

export default router;
