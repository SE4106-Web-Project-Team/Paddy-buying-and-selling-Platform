// src/pages/feature/chatbot.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/features/chatbot.css";

const suggestedQuestions = [
  "When should I plant paddy in Southern Province?",
  "How to identify and treat rice blast disease?",
  "What fertilizer is best for paddy cultivation?",
  "How can I store harvested paddy properly?",
  "What is the current market price of paddy?",
  "Tips for organic paddy farming",
];

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSend = async (msg) => {
    const userMessage = msg || input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    const res = await fetch("http://localhost:5000/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
  };

  return (
    <div className="chatbot-container">
      <p>
        <a href="/" className="chatbot-back-link">Back</a>
      </p>
      <h1 className="chatbot-title">Agri Chatbot</h1>

      <div className="suggested-questions">
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            className="suggested-button"
            onClick={() => handleSend(q)}
          >
            {q}
          </button>
        ))}
      </div>

      <div>
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your question..."
        />
        <button className="chat-send-button" onClick={() => handleSend()}>Send</button>
      </div>
    </div>
  );
}
