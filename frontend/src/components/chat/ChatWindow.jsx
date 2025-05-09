import React, { useEffect, useState } from "react";
import axios from "axios";
import MessageInput from "./MessageInput";

const ChatWindow = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (currentUser && selectedUser) {
      axios
        .get(
          `http://localhost:5000/api/chat/messages/${currentUser.id}/${selectedUser.id}`
        )
        .then((res) => setMessages(res.data))
        .catch((err) =>
          console.error("Error fetching messages:", err)
        );
    }
  }, [selectedUser]);

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
      })
      .catch((err) => console.error("Send failed:", err));
  };

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
