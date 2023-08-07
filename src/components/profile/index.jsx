import React, { useState } from 'react';
import './index.css'; 
import axios from 'axios';

const ProfileCard = () => {
    const user = JSON.parse(localStorage.getItem("userDetails"))
    const [isClickedEditProfile, setisClickedEditProfile] = useState(false);
    const [profile, setProfile] = useState({
      id: user.id,
      name: user.name,
      mobileNumber: user.mobileNumber,
      adderss: user.adderss,
      email: user.email,
      cartItems: JSON.parse(localStorage.getItem("productsInCart"))?JSON.parse(localStorage.getItem("productsInCart")).length:0,
    });

  const handleEditProfile = () => {
    setisClickedEditProfile(true)
  };

  const handleNameChange = (event) => {
    setProfile({ ...profile, name: event.target.value });
  };
  const handleEmailChange = (event) => {
    setProfile({ ...profile, email: event.target.value });
  };
  const handleNumberChange = (event) => {
    setProfile({ ...profile, phoneNumber: event.target.value });
  };
  const handleAdderssChange = (event) => {
    setProfile({ ...profile, adderss: event.target.value });
  };

  const ChangeProfile = async (event) => {
    event.preventDefault();
    let params = new URLSearchParams();
    params.append("userDetails", JSON.stringify(profile))
    let response  = await axios.post("http://localhost:8083/e-commerces-backend/backend.php/users", params.toString())
    console.log(response)
    localStorage.setItem("userDetails", JSON.stringify(profile))
    setisClickedEditProfile(false)
  }

  const cancelEditProfile  = () => {
    setisClickedEditProfile(false)
    console.log("hihii")
  }
  //console.log(isClickedEditProfile)
  return (
    <div className='profile-bg'>
        {!isClickedEditProfile?<div className="profile-card">
            <h2>{profile.name}</h2>
            <p><span className='pr-2'>Email: </span> {profile.email}</p>
            <p><span className='pr-2'>Phone Number: </span> {profile.mobileNumber}</p>
            <p><span className='pr-2'>Adderss: </span> {profile.adderss}</p>
            <p><span className='pr-2'>Items in Cart: </span> {profile.cartItems}</p>
            <button className='btn btn-outline-warning mt-3 mb-3' onClick={handleEditProfile}>Edit Profile</button>
        </div>:<div className="profile-card">
            <form className='profile-form'>
                <input
                  id='name'
                  type="text"
                  placeholder='Enter Your Full Name'
                  value={profile.name || ""}
                  className='p-2'
                  onChange={handleNameChange}
                  
                />
                <input
                  id='email'
                  type="email"
                  placeholder='Enter Your email'
                  className='p-2'
                  value={profile.email || ""}
                  onChange={handleEmailChange}
                />
                <input
                  id='number'
                  type="number"
                  placeholder='Enter Your number'
                  className='p-2'
                  value={profile.phoneNumber}
                  onChange={handleNumberChange}
                  
                />            
                <input
                  id='adderss'
                  type="text"
                  placeholder='Add Your Adderss'
                  className='p-2'
                  value={profile.adderss || ""}
                  onChange={handleAdderssChange}
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
