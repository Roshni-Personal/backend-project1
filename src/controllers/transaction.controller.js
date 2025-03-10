import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Transaction } from "../models/transaction.models.js";

const createTransaction = asyncHandler(async (req, res) => {
  const { type, amount, category, date, title, description } = req.body;

  if (
    [type, amount, category, date, title].some(
      (field) => field === undefined || field === null || field === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const transaction = await Transaction.create({
    type,
    amount,
    category,
    date,
    title,
    description,
  });

  const createdTransaction = await Transaction?.findById(
    transaction?._id
  ).select();
  if (!createdTransaction) {
    throw new ApiError(
      500,
      "Something went wrong while creating a transaction"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdTransaction,
        "Transaction registered successfully"
      )
    );
});

const getAllTransactions = async (req, res) => {
  try {
    const { categoryId, type, startDate, endDate } = req.query;

    const filter = {};
    if (categoryId) filter.category = categoryId;
    if (type) filter.type = type;
    if (startDate) filter.date = { ...filter.date, $gte: new Date(startDate) };
    if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate) };

    const transactions = await Transaction.find(filter).sort({ date: -1 });

    const totalIncome = transactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0);

    const netBalance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      data: transactions,
      summary: { totalIncome, totalExpense, netBalance },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching transactions" });
  }
};

const updateTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { type, amount, category, date, title, description } = req.body;

  if (!id) {
    throw new ApiError(400, "Transaction ID is required");
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    id,
    {
      $set: {
        type,
        amount,
        category,
        date,
        title,
        description,
      },
    },
    { new: true }
  );

  if (!updatedTransaction) {
    throw new ApiError(404, "Transaction not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedTransaction,
        "Transaction updated successfully"
      )
    );
});

const getTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const transaction = await Transaction.findById(id);
  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, transaction, "Transaction fetched successfully")
    );
});

const deleteMultipleTransactions = asyncHandler(async (req, res) => {
  const { transactionIds } = req.body;

  if (!Array.isArray(transactionIds) || transactionIds.length === 0) {
    throw new ApiError(400, "Transaction IDs are required in an array");
  }

  const deletedTransactions = await Transaction.deleteMany({
    _id: { $in: transactionIds },
  });

  if (deletedTransactions.deletedCount === 0) {
    throw new ApiError(404, "No transactions found to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Transactions deleted successfully"));
});

const getTransactionSummary = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  let filter = {};
  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  // Aggregate total income and expense
  const transactions = await Transaction.find(filter);

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { totalIncome, totalExpense, netBalance },
        "Summary fetched successfully"
      )
    );
});

export {
  createTransaction,
  updateTransaction,
  getAllTransactions,
  getTransaction,
  deleteMultipleTransactions,
  getTransactionSummary,
};
