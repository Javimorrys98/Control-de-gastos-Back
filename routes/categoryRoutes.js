import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createCategory,
  removeCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").post(authMiddleware, createCategory);

router.route("/:id").delete(authMiddleware, removeCategory);

export default router;
