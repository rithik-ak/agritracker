const express = require("express");
const { askChatbot } = require("../controllers/chatbotController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, askChatbot);

module.exports = router;
