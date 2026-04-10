const express = require("express");
const { addTransaction, getTransactions } = require("../controllers/transactionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getTransactions);
router.post("/", protect, addTransaction);

module.exports = router;
