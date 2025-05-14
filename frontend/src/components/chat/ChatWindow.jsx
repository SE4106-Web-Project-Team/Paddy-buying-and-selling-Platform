import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import MessageInput from "./MessageInput";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
});

const ChatWindow = ({ currentUser, selectedUser, setSelectedUser }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Join room
  useEffect(() => {
    if (currentUser) {
      socket.emit("join_room", currentUser.id);
    }
  }, [currentUser]);

  // Fetch messages
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

  // Listen for new incoming messages
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
    return () => socket.off("receive_message", handler);
  }, [selectedUser, currentUser]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle send
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

  // Handle delete chat
  const handleDeleteChat = async () => {
    if (!selectedUser) return;

    if (window.confirm("Are you sure you want to delete this chat?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/chat/delete-chat/${selectedUser.id}`,
          {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          }
        );
        setMessages([]);
        setSelectedUser(null);
      } catch (err) {
        console.error("Error deleting chat:", err);
      }
    }
  };

  // Handle delete message
  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/chat/messages/${messageId}`,
        {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        }
      );
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  return (
    <div className="chat-window">
      {selectedUser ? (
        <>
          <div className="chat-header">
            <h3>Chat with {selectedUser.name || "Seller"}</h3>
            <button onClick={handleDeleteChat} className="delete-chat-btn">
              🗑️ Delete Chat
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={msg.id || i}
                className={`chat-bubble ${
                  msg.sender_id === currentUser.id ? "sent" : "received"
                }`}
              >
                <div className="message-text">{msg.message}</div>

                {msg.sender_id === currentUser.id && (
                  <button
                    className="delete-msg-btn"
                    onClick={() => handleDeleteMessage(msg.id)}
                    title="Delete message"
                  >
                    ❌
                  </button>
                )}
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
