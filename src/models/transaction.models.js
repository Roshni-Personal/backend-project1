import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["INCOME", "EXPENSE"],
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => !isNaN(new Date(value).getTime()), // Ensure valid date
        message: "Invalid date format",
      },
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
