// src/pages/shop/ShopEdit.jsx
import React, { useState } from "react";
import '../../styles/ShopEdit/ShopEdit.css';
import bag from "../../resources/images/ProfileEdit/bag.png"


const ShopEdit = () => {
  const [shopImage, setShopImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setShopImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="shop-page">
      <div className="shop-form">
        <h2 className="shop-title">Create and Edit Shop Profile</h2>

        <div className="shop-image-section">
          <label htmlFor="shopUpload" className="shop-upload">
            {shopImage ? (
              <img src={shopImage} alt="Uploaded Shop" className="shop-img" />
            ) : (
              <img src={bag} alt="Default Shop" className="shop-img" />
            )}
            <input
              type="file"
              id="shopUpload"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
            <span className="edit-icon">📷</span>
          </label>
        </div>

        <form>
          <input type="text" placeholder="Shop Name" />
          <input type="text" placeholder="Location" />
          <textarea placeholder="Description" rows="3"></textarea>
          <input type="text" placeholder="Opening Hours" />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default ShopEdit;

