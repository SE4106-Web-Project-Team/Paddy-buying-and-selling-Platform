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
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return;
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
      <UserList users={chatUsers} onSelectUser={handleSelectUser} />
      <ChatWindow currentUser={user} selectedUser={selectedUser} />
    </div>
  );
};

export default Chat;