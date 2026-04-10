import { useEffect, useState } from "react";
import GlassCard from "../ui/GlassCard";
import { socket } from "../services/socket";

const CommunityChatPage = () => {
  const user = (() => { try { const r = sessionStorage.getItem("user"); return r ? JSON.parse(r) : {}; } catch { return {}; } })();
  const [receiverId, setReceiverId] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    socket.connect();
    socket.emit("join", user.id);
    socket.on("receive_message", (msg) => setMessages((prev) => [...prev, msg]));
    socket.on("message_saved", (msg) => setMessages((prev) => [...prev, msg]));
    return () => {
      socket.off("receive_message");
      socket.off("message_saved");
      socket.disconnect();
    };
  }, [user?.id]);

  const send = (e) => {
    e.preventDefault();
    if (!receiverId || !text.trim()) return;
    socket.emit("send_message", { senderId: user.id, receiverId, message: text.trim() });
    setText("");
  };

  return (
    <GlassCard className="h-[70vh]">
      <h3 className="mb-4 text-xl font-semibold">Farmer Community Chat</h3>
      <form onSubmit={send} className="mb-3 flex gap-2">
        <input className="w-52 rounded-xl bg-white/10 p-3 ring-1 ring-white/20 outline-none" placeholder="Receiver user id" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} />
        <input className="flex-1 rounded-xl bg-white/10 p-3 ring-1 ring-white/20 outline-none" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} />
        <button className="rounded-xl bg-emerald-500 px-5 font-semibold hover:bg-emerald-400">Send</button>
      </form>
      <div className="h-[52vh] space-y-2 overflow-y-auto rounded-xl bg-black/20 p-3">
        {messages.map((msg) => (
          <div key={msg._id || `${msg.senderId}-${msg.timestamp}`} className={`max-w-[70%] rounded-xl px-3 py-2 ${msg.senderId === user.id ? "ml-auto bg-emerald-500/30" : "bg-white/10"}`}>
            {msg.message}
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default CommunityChatPage;
