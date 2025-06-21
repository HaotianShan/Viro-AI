import { useState, useEffect, useRef } from "react";
import { createSession, runAgent } from "@/services/agentService";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState(() => Math.random().toString(36).substring(2, 10));
  const [sessionId] = useState(() =>
    Math.random().toString(36).substring(2, 10)
  );
  const messagesEndRef = useRef(null);

  console.log("User ID:", userId);
  console.log("Session ID:", sessionId);

  useEffect(() => {
    createSession(userId, sessionId)
      .then(() => console.log("Session initialized"))
      .catch((err) => console.error("Session error:", err));
  }, [userId, sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    try {
      const userMessage = { text: message, sender: "user" };
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");
      setIsLoading(true);

      const response = await runAgent(userId, sessionId, message);

      const agentMessage = { text: response, sender: "agent" };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error. Please try again.",
          sender: "agent",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md h-[600px] mx-auto my-8 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="p-3 bg-gray-50 border-b border-gray-200 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>User: {userId}</span>
          <span>Session: {sessionId}</span>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-white flex flex-col gap-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[85%] px-4 py-3 rounded-lg ${
              msg.sender === "user"
                ? "ml-auto bg-blue-100 text-gray-800"
                : "mr-auto bg-gray-100 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {isLoading && (
          <div className="mr-auto bg-gray-100 px-4 py-3 rounded-lg max-w-[85%]">
            <div className="flex space-x-1 py-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex p-3 border-t border-gray-200 bg-white"
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 bg-white" // Fixed text color
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`ml-2 px-4 py-2 rounded-full text-white font-medium ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
