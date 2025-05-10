import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../../components/chat/UserList";
import ChatWindow from "../../components/chat/ChatWindow";
import "../../styles/chat/chat.css";

const Chat = () => {
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
      .then((res) => setChatUsers(res.data))
      .catch((err) => console.error("Error fetching chat users:", err));
  }, []);

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
