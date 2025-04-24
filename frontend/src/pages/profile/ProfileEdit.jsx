// src/pages/profile/ProfileEdit.jsx
import React, { useState } from "react";
import '../../styles/ProfileEdit/ProfileEdit.css';
import profile from "../../resources/images/ProfileEdit/profile.jpg";

const ProfileEdit = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="form-title">Profile</h2>

        <div className="avatar-section">
          <label htmlFor="profileUpload" className="profile-upload">
            {profileImage ? (
              <img src={profileImage} alt="Uploaded Profile" className="profile-img" />
            ) : (
              <img src={profile} alt="Default Profile" className="profile-img" />
            )}
            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
            <span className="edit-icon">📷</span>
          </label>
        </div>

        <form className="profile-form">
          <input className="form-input" type="text" placeholder="Name" />
          <input className="form-input" type="text" placeholder="Profile Type" />
          <textarea className="form-input" placeholder="Description" />
          <input className="form-input" type="text" placeholder="Province" />
          <input className="form-input" type="email" placeholder="Email" />
          <input className="form-input" type="tel" placeholder="Phone" />

          <button type="submit" className="save-button">Save</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
