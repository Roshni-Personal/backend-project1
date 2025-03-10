import { Router } from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controller.js";

const router = Router();

router.route("/").post(createCategory);
router.route("/").get(getAllCategories);

export default router;
