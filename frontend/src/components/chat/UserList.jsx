import React from "react";

const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="chat-sidebar">
      <h3>Chats</h3>
      {users.map((u) => (
        <div
          key={u.id}
          className="chat-user"
          onClick={() => onSelectUser(u)}
        >
          {u.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;
