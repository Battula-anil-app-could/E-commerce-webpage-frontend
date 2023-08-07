import React, { useState } from 'react';
import './index.css'; 

const ProfileCard = () => {
    const user = JSON.parse(localStorage.getItem("userDetails"))
    const [isClickedEditProfile, setisClickedEditProfile] = useState(false);
    const [profile, setProfile] = useState({
      name: user.name,
      phoneNumber: user.mobileNumber,
      adderss: user.adderss,
      email: user.email,
      cartItems: JSON.parse(localStorage.getItem("productsInCart"))?JSON.parse(localStorage.getItem("productsInCart")).length:0,
    });

  const handleEditProfile = () => {
    setisClickedEditProfile(true)
  };

  const ChangeProfile = (event) => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let number = document.getElementById("number").value;
    let adderss = document.getElementById("adderss").value;
    if (name !== ""){
      profile['name'] = name
    }
    if (email !== ""){
      profile['email'] = email
    }
    if (number !== ""){
      profile['phoneNumber'] = number
    }
    if (adderss !== ''){
      profile['adderss'] = adderss
    }

    localStorage.setItem("userDetails", JSON.stringify(profile))
    setisClickedEditProfile(false)
  }

  const cancelEditProfile  = () => {
    setisClickedEditProfile(false)
    console.log("hihii")
  }
  console.log(isClickedEditProfile)
  return (
    <div className='profile-bg'>
        {!isClickedEditProfile?<div className="profile-card">
            <h2>{profile.name}</h2>
            <p><span>Email:</span> {profile.email}</p>
            <p><span>Phone Number:</span> {profile.phoneNumber}</p>
            <p><span>Adderss:</span> {profile.adderss}</p>
            <p><span>Items in Cart:</span> {profile.cartItems}</p>
            <button className='btn btn-outline-warning mt-3 mb-2' onClick={handleEditProfile}>Edit Profile</button>
        </div>:<div className="profile-card">
            <form className='profile-form'>
                <input
                  id='name'
                  type="text"
                  placeholder='Enter Your Full Name'
                  className='p-2'
                  
                />
                <input
                  id='email'
                  type="email"
                  placeholder='Enter Your email'
                  className='p-2'
                />
                <input
                  id='number'
                  type="text"
                  placeholder='Enter Your number'
                  className='p-2'
                  
                />            
                <input
                  id='adderss'
                  type="text"
                  placeholder='Add Your Adderss'
                  className='p-2'
                />
              <div className="button-container-profile">
                <button type="submit" className='btn btn-outline-info mt-3 mb-2' onClick={ChangeProfile}>Submit</button>
                <button type="button" className='btn btn-outline-danger mt-3 mb-2 mr-2' onClick={cancelEditProfile}>Cancel</button>
              </div>
            </form>
          </div>}
    </div>
  );
};

export default ProfileCard;
