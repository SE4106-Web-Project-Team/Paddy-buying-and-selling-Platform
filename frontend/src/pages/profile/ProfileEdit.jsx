// src/pages/profile/ProfileEdit.jsx
import React from "react";
import '../../styles/ProfileEdit/ProfileEdit.css';
import profileAvatar from "../../resources/images/ProfileEdit/profile.jpg"
const ProfileEdit = () => {
  return (
    <div
      className="page-container">
      <div className="form-container">
        <h2 className="form-title">Profile</h2>

        <div className="avatar-section">
          <img
             src={profileAvatar}
            alt="Avatar"
            className="avatar-image"
          />
          <span className="status-text" >Active</span>
        </div>

        <form className="profile-form">
          <input className="form-input" type="text" placeholder="Name" />
          <input className="form-input" type="text" placeholder="Profile Type" />
          <textarea className="form-input" placeholder="Description" />
          <input className="form-input" type="text" placeholder="Province" />
          <input className="form-input" type="email" placeholder="Email" />
          <input className="form-input" type="tel" placeholder="Phone" />

          <button
            type="submit"
            className="save-button"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;