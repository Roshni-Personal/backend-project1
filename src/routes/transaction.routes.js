import { Router } from "express";

const router = Router();

import {
  createTransaction,
  deleteMultipleTransactions,
  getAllTransactions,
  getTransaction,
  getTransactionSummary,
  updateTransaction,
} from "../controllers/transaction.controller.js";

router.route("/summary").get(getTransactionSummary);
router.route("/").get(getAllTransactions);
router.route("/").post(createTransaction);
router.route("/:id").get(getTransaction).patch(updateTransaction);
router.route("/").delete(deleteMultipleTransactions);

export default router;
