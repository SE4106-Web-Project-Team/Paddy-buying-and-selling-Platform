// src/pages/profile/ProfileEdit.jsx
import React, { useState } from "react";
import '../../styles/ProfileEdit/ProfileEdit.css';
import profile from "../../resources/images/ProfileEdit/profile.jpg";

//handle image changes for profile image
const ProfileEdit = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    //page
    <div className="page-container"> 
      {/*form*/} 
      <div className="form-container">
        <h2 className="form-title">Profile</h2>{/*Title*/} 
        <div className="avatar-section">{/*profile image, if user did not uploade any images use default one*/} 
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
        {/*form section*/} 
        <form>
          <input  type="text" placeholder="Name" />
          <input  type="text" placeholder="Profile Type" />
          <textarea placeholder="Description" rows="3"/> {/*textarea--multi-line text input, It’s like an input field, but it lets users type more than one line*/}
          <input  type="text" placeholder="Province" />
          <input type="email" placeholder="Email" />
          <input  type="tel" placeholder="Phone" />
        {/*save button*/} 
          <button type="submit" className="save-button">Save</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
