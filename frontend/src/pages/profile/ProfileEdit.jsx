// src/pages/profile/ProfileEdit.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/auth/signup.css'; // You can later create a separate editprofile.css

const ProfileEdit = () => {
  const navigate = useNavigate();

  const [profilePicture, setProfilePicture] = useState(null);
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('');
  const [description, setDescription] = useState('');

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
  
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);
      formData.append('phone', phone);
      formData.append('province', province);
      formData.append('description', description);
  
      const response = await axios.put('http://localhost:5000/api/users/update-profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      alert('Profile updated successfully!');
      console.log(response.data);
  
      navigate('/profile');
      
    } catch (error) {
      console.error('Update error:', error.response?.data || error.message);
      alert('Update Failed: ' + (error.response?.data.message || error.message));
    }
  };
  

  return ( 
    <div className="signup-container">
      <div className="signup-container-blur-layer"></div>

      <div className="signup-card">
        <h2>Edit Profile</h2>

        <input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <select value={province} onChange={(e) => setProvince(e.target.value)}>
          <option value="" disabled>Select Province</option>
          <option value="Central">Central</option>
          <option value="Northern">Northern</option>
          <option value="Southern">Southern</option>
          <option value="Eastern">Eastern</option>
          <option value="Western">Western</option>
        </select>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{ padding: '10px', borderRadius: '5px' }}
        ></textarea>

        <button onClick={handleProfileUpdate}>Save Changes</button>

        <hr />
        <p><a href="/profile">Go Back</a></p>
      </div>
    </div>
  );
};


export default ProfileEdit;
