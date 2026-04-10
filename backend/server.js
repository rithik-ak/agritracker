const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const { dynamicCors } = require("./config/cors");
const Message = require("./models/Message");

dotenv.config({ path: "../.env" });
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { ...dynamicCors, methods: ["GET", "POST"] },
});

app.use(cors(dynamicCors));
app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => res.json({ message: "Agri Tracker API is running" }));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/chatbot", require("./routes/chatbotRoutes"));

const onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    onlineUsers.set(String(userId), socket.id);
  });

  socket.on("send_message", async (payload) => {
    const { senderId, receiverId, message } = payload || {};
    if (!senderId || !receiverId || !message) return;

    const saved = await Message.create({ senderId, receiverId, message });
    const receiverSocket = onlineUsers.get(String(receiverId));

    if (receiverSocket) {
      io.to(receiverSocket).emit("receive_message", saved);
    }

    socket.emit("message_saved", saved);
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
