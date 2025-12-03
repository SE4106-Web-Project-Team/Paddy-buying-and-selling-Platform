import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import UserList from "../../components/chat/UserList";
import ChatWindow from "../../components/chat/ChatWindow";
import "../../styles/features/chat.css";

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUserString || !token) {
      navigate("/login");
      return;
    }

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
            const tempUser = {
              id: location.state.sellerId,
              name: location.state.sellerName || "Seller",
            };
            setSelectedUser(tempUser);
            setChatUsers((prev) => [...prev, tempUser]);
          }
        }
      })
      .catch((err) => console.error("Error fetching chat users:", err));
  }, [location.state, navigate]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  // Filter users based on search term
  const filteredUsers = chatUsers.filter((u) =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-container">
      <p>
        <a href="/" className="chat-back-link">Back</a>
      </p>
      {user && (
        <>
          <div className="chat-sidebar">
            <input
              type="text"
              placeholder="Search chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                margin: "10px",
                padding: "5px",
                width: "80%",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <UserList
              users={filteredUsers}
              onSelectUser={handleSelectUser}
              selectedUser={selectedUser}
            />
          </div>

          {selectedUser ? (
            <ChatWindow
              currentUser={user}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              setMessages={() => {}}
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
