import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUserSheets } from "../controllers/userController.js";

const router = express.Router();

router.route("/:user/sheets").get(authMiddleware, getUserSheets);

export default router;
