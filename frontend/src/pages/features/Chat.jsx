import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Add this
import axios from "axios";
import UserList from "../../components/chat/UserList";
import ChatWindow from "../../components/chat/ChatWindow";
import "../../styles/chat/chat.css";

const Chat = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    if (!storedUserString) return;

    const storedUser = JSON.parse(storedUserString);
    setUser(storedUser);

    axios
      .get(`http://localhost:5000/api/chat/users/${storedUser.id}`)
      .then((res) => {
        setChatUsers(res.data);

        // Auto-select seller if redirected from Gig page
        if (location.state?.sellerId) {
          const matched = res.data.find(
            (u) => u.id === location.state.sellerId
          );
          if (matched) {
            setSelectedUser(matched);
          } else {
            // Fallback if seller not in recent chat users
            setSelectedUser({
              id: location.state.sellerId,
              name: location.state.sellerName || "Seller",
            });
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
      {user && (
        <>
          <UserList
            users={chatUsers}
            onSelectUser={handleSelectUser}
            selectedUser={selectedUser}
          />
          {selectedUser ? (
            <ChatWindow currentUser={user} selectedUser={selectedUser} />
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
