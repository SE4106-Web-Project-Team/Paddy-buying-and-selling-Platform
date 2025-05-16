import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Add this
import axios from "axios";
import UserList from "../../components/chat/UserList";
import ChatWindow from "../../components/chat/ChatWindow";
import "../../styles/features/chat.css";

const Chat = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!storedUserString || !token) return;

    const storedUser = JSON.parse(storedUserString);
    storedUser.token = token;
    setUser(storedUser);

    axios
      .get(`http://localhost:5000/api/chat/users/${storedUser.id}`)
      .then((res) => {
        const users = res.data;
        setChatUsers(users);

        if (location.state?.sellerId) {
          const matched = users.find((u) => u.id === location.state.sellerId);
          if (matched) {
            setSelectedUser(matched);
          } else {
            // Fallback if seller not in recent chats
            const tempUser = {
              id: location.state.sellerId,
              name: location.state.sellerName || "Seller",
            };
            setSelectedUser(tempUser);
            setChatUsers((prev) => [...prev, tempUser]); // Add to sidebar list
          }
        }
      })
      .catch((err) => console.error("Error fetching chat users:", err));
  }, [location.state]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="chat-container">
      <p>
        <a href="/">Back</a>
      </p>
      {user && (
        <>
          <UserList
            users={chatUsers}
            onSelectUser={handleSelectUser}
            selectedUser={selectedUser}
          />
          {selectedUser ? (
            <ChatWindow
              currentUser={user}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              setMessages={() => {}} // Optional: if you want to manage messages from Chat.jsx later
            />
          ) : (
            <div className="chat-window-placeholder">
              Select a user to start chatting
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Chat;
