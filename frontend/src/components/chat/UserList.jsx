import React from "react";

const UserList = ({ users, onSelectUser, selectedUser }) => {
  return (
    <div className="chat-sidebar1">
      <h3>Chats</h3>
      {users.map((u) => (
        <div
          key={u.id}
          className={`chat-user ${
            selectedUser && selectedUser.id === u.id ? "selected" : ""
          }`}
          onClick={() => onSelectUser(u)}
        >
          {u.name}
        </div>
      ))}
    </div>
  );
};


export default UserList;
