const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    if (!receiverId || !message) {
      return res.status(400).json({ message: "receiverId and message are required" });
    }

    const savedMessage = await Message.create({
      senderId: req.user.id,
      receiverId,
      message,
    });

    return res.status(201).json(savedMessage);
  } catch (error) {
    return res.status(500).json({ message: "Failed to save message", error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { withUser } = req.query;
    if (!withUser) {
      return res.status(400).json({ message: "withUser query param is required" });
    }

    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, receiverId: withUser },
        { senderId: withUser, receiverId: req.user.id },
      ],
    }).sort({ timestamp: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
};

module.exports = { sendMessage, getMessages };
