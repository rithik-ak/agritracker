const { Groq } = require("groq-sdk");

const SYSTEM_PROMPT =
  "You are Agri Tracker assistant. Answer all farming questions about crops, irrigation, pest control, soil, weather, market prices, livestock, and agriculture in general. Be practical, clear, and helpful.";

const MAX_QUESTION_LENGTH = 500;

const sanitizeInput = (input) =>
  input
    .replace(/[<>]/g, "")
    .replace(/ignore\s+(previous|above|all)\s+instructions?/gi, "")
    .trim()
    .slice(0, MAX_QUESTION_LENGTH);

const askChatbot = async (req, res) => {
  try {
    const raw = req.body?.question;
    if (!raw || typeof raw !== "string") {
      return res.status(400).json({ message: "question is required" });
    }

    const question = sanitizeInput(raw);
    if (!question) {
      return res.status(400).json({ message: "Invalid question" });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ message: "GROQ_API_KEY is missing in environment" });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user",   content: question },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_tokens: 8192,
      top_p: 1,
      stream: true,
      stop: null,
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let fullReply = "";

    for await (const chunk of chatCompletion) {
      const delta = chunk.choices[0]?.delta?.content || "";
      if (delta) {
        fullReply += delta;
        res.write(`data: ${JSON.stringify({ delta })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true, reply: fullReply })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Chatbot error:", error.message);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Chatbot failed", error: error.message });
    }
    res.end();
  }
};

module.exports = { askChatbot };
