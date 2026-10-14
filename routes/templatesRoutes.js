import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTemplate, removeTemplate } from "../controllers/templateController.js";

const router = express.Router();

router.route("/").post(authMiddleware, createTemplate);

router.route("/:id/remove").patch(authMiddleware, removeTemplate);

export default router;
