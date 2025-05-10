// src/pages/gig/GigEdit.jsx
import React, { useState } from "react";
import '../../styles/GigEdit/GigEdit.css';
import paddy from "../../resources/images/ProfileEdit/paddy.jpeg"

//handle image changes for profile image
const CreateGig = () => {
  const [paddyImage, setPaddyImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaddyImage(URL.createObjectURL(file));
    }
  };

  return (
    //page
    <div className="gig-page">
    {/*form*/}
      <div className="gig-form">
        <h2 className="gig-title">Create and Edit Gig Page</h2>{/*Title*/}
        <div className="paddy-section">{/*paddy image, if user did not uploade any images use default one*/} 
          <label htmlFor="paddyUpload" className="paddy-upload">
            {paddyImage ? (
              <img src={paddyImage} alt="Uploaded Paddy" className="paddy-img" />
            ) : (
              <img src={paddy} alt="Default paddy Profile" className="paddy-img" />
            )}
            <input
              type="file"
              id="paddyUpload"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
            <span className="edit-icon">📷</span>
          </label>
        </div>
         {/*form section*/}
        <form>
          <input type="text" placeholder="Paddy Type" />
          <input type="text" placeholder="Price" />
          <textarea placeholder="Description" rows="3"></textarea>
          <input type="text" placeholder="Quantity" />
          {/*save button*/} 
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGig;
