import { Router } from "express";
import allCategory from "../controllers/categoryController.js";

const router = Router();
router.get("/category", allCategory);

export default router;
