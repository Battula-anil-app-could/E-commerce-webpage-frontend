import React, { useState } from 'react';
import './index.css'; 

const ProfileCard = () => {
    const user = JSON.parse(localStorage.getItem("userDetails"))
  const [profile, setProfile] = useState({
    name: user.name,
    phoneNumber: user.mobileNumber,
    email: user.email,
    cartItems: JSON.parse(localStorage.getItem("productsInCart"))?JSON.parse(localStorage.getItem("userDetails")).length:0,
  });

  const handleEditProfile = () => {
    console.log("hi")
  };

  return (
    <div className='profile-bg'>
        <div className="profile-card">
            <h2>{profile.name}</h2>
            <p>Email: {profile.email}</p>
            <p>Phone Number: {profile.phoneNumber}</p>
            <p>Items in Cart: {profile.cartItems}</p>
            <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
    </div>
  );
};

export default ProfileCard;
