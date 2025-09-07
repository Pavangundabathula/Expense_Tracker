import mongoose from "mongoose";

const BalanceSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  Expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  date: { type: Date, default: Date.now },
  state: { type: Number, default: 0 }
}, { timestamps: true });

const Balance = mongoose.model("Balance", BalanceSchema);

export default Balance;
