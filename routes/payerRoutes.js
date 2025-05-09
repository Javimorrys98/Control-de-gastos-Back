import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createPayer, removePayer } from "../controllers/payerController.js";

const router = express.Router();

router.route("/").post(authMiddleware, createPayer);

router.route("/:id").delete(authMiddleware, removePayer);

export default router;
