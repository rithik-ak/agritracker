const Transaction = require("../models/Transaction");

const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;
    if (!title || !amount || !type) {
      return res.status(400).json({ message: "Title, amount, and type are required" });
    }

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      date,
      userId: req.user.id,
    });

    return res.status(201).json(transaction);
  } catch (error) {
    return res.status(500).json({ message: "Failed to add transaction", error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch transactions", error: error.message });
  }
};

module.exports = { addTransaction, getTransactions };
