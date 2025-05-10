import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import MessageInput from "./MessageInput";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
});

const ChatWindow = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      socket.emit("join_room", currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && selectedUser) {
      axios
        .get(
          `http://localhost:5000/api/chat/messages/${currentUser.id}/${selectedUser.id}`
        )
        .then((res) => setMessages(res.data))
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [selectedUser, currentUser]);

  // ✅ Fixed: single socket listener with proper cleanup
  useEffect(() => {
    const handler = (data) => {
      if (
        data.sender_id === selectedUser?.id &&
        data.receiver_id === currentUser?.id
      ) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receive_message", handler);
    return () => {
      socket.off("receive_message", handler);
    };
  }, [selectedUser, currentUser]);

  const handleSendMessage = (message) => {
    const msg = {
      sender_id: currentUser.id,
      receiver_id: selectedUser.id,
      message,
    };

    axios
      .post("http://localhost:5000/api/chat/send", msg)
      .then(() => {
        setMessages((prev) => [...prev, msg]);
        socket.emit("send_message", msg);
      })
      .catch((err) => console.error("Send error:", err));
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      {selectedUser ? (
        <>
          <div className="chat-header">
            <h4>{selectedUser.name}</h4>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.sender_id === currentUser.id
                    ? "chat-bubble sent"
                    : "chat-bubble received"
                }
              >
                {msg.message}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <MessageInput onSend={handleSendMessage} />
        </>
      ) : (
        <div className="chat-placeholder">Select a chat to start messaging</div>
      )}
    </div>
  );
};

export default ChatWindow;
