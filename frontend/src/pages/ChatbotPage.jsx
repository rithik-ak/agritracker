import { useRef, useState } from "react";
import GlassCard from "../ui/GlassCard";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ChatbotPage = () => {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([
    { role: "bot", text: "Hello farmer! Ask me anything about crops, irrigation, pest control, or farming." },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const scrollBottom = () =>
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);

  const ask = async (e) => {
    e.preventDefault();
    const q = question.trim();
    if (!q || loading) return;

    setChat((prev) => [...prev, { role: "user", text: q }]);
    setQuestion("");
    setLoading(true);

    // Add empty bot message that we'll stream into
    setChat((prev) => [...prev, { role: "bot", text: "" }]);
    scrollBottom();

    try {
      const res = await fetch(`${API_BASE}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ question: q }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setChat((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "bot", text: err.message || "Request failed." };
          return updated;
        });
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop(); // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const payload = JSON.parse(line.slice(6));
            if (payload.delta) {
              setChat((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "bot",
                  text: updated[updated.length - 1].text + payload.delta,
                };
                return updated;
              });
              scrollBottom();
            }
          } catch {}
        }
      }
    } catch {
      setChat((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "bot", text: "Could not reach the server." };
        return updated;
      });
    } finally {
      setLoading(false);
      scrollBottom();
    }
  };

  return (
    <GlassCard className="flex flex-col h-[78vh]">
      <h3 className="mb-4 text-xl font-semibold flex-shrink-0">AI Farming Chatbot</h3>

      <div className="flex-1 overflow-y-auto space-y-3 rounded-xl bg-black/20 p-3 mb-3">
        {chat.map((line, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap leading-relaxed ${
              line.role === "user"
                ? "ml-auto bg-emerald-500/30 text-white"
                : "bg-white/10 text-white/90"
            }`}
          >
            {line.text}
            {loading && idx === chat.length - 1 && line.role === "bot" && !line.text && (
              <span className="inline-flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce [animation-delay:0.15s]">.</span>
                <span className="animate-bounce [animation-delay:0.3s]">.</span>
              </span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={ask} className="flex gap-2 flex-shrink-0">
        <input
          className="flex-1 rounded-xl bg-white/10 p-3 text-sm ring-1 ring-white/20 outline-none placeholder:text-white/40"
          placeholder="Ask a farming question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />
        <button
          disabled={loading}
          className="rounded-xl bg-emerald-500 px-5 font-semibold hover:bg-emerald-400 disabled:opacity-50 transition"
        >
          {loading ? "..." : "Ask"}
        </button>
      </form>
    </GlassCard>
  );
};

export default ChatbotPage;
