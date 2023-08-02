import { useState } from "react"
import Login from "../login/index"
import Signup from '../signup/index'
import "./index.css"

const NavBAr = () => {
    const [isLogin, setisLogin] = useState(false)
    const [isClickedSignup, setisClickedSignup] = useState(false)
    const goToLogin = () => {
        setisLogin(true)
    }
    
    const CancelLogin = () => {
        setisLogin(false)
    }
    const LogOutOff = () =>{
        setisLogin(false)
    }

    const clickedSingup = () => {
        setisClickedSignup(true)
    }
    const cancelSignUp = () => {
        setisClickedSignup(false)
    }
    return(
        <div className="bg-conti">
        <div className="container-fulid">
            <div className="row">
                  <div className="col-12">
                      <nav className="navbar navbar-expand-lg navbar-light bg-primary container-fulid text-white">
                          <a className="navbar-brand" href="#">
                              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI3XOX95YPX4vj0LFhtGrdEpxXBTlIet3-dw&usqp=CAU" id="imag" alt='webpage'/>
                          </a>
                          <div id="search-bar-card">
                            <select id='category'>
                              <option value=""></option>
                              <option value="Clothing" className="p-3 m-5 mr-3 ml-3">clothing</option>
                              <option value="Grocery Items" className="p-3 m-5 mr-3 ml-3">Grocery Items</option>
                              <option value="Electronices" className="p-3 m-5 mr-3 ml-3">Electronices</option>
                            </select>
                            <input type='text' id = "search-bar" placeholder='Search for products'/>
                            <button id="search-btn">
                                <i className="fa-solid fa-magnifying-glass" id="search-icon"></i>
                            </button>
                          </div>
                          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon"></span>
                          </button>
                          <div className="collapse navbar-collapse ml-auto" id="navbarNav">
                              <ul className="navbar-nav ml-auto p-2">
                              {!isLogin && <li className="nav-item active bg-primary">
                                  <button className="nav-link option loged-btns p-2 m-2 text-white" onClick={clickedSingup}>Signup</button>
                                  {isClickedSignup && <Signup cancelSignUp = {cancelSignUp}/>}
                              </li>}
                              <li className="nav-item login-btn-li">
                                  <button className="nav-link option loged-btns p-2 m-2 text-white" onClick={goToLogin}>Login</button>
                                  {isLogin && <Login CancelLogin = {CancelLogin}/>}
                              </li>
                              {isLogin && <li className="nav-item  profile-card">
                                <button className="profile-btn mr-3 ">
                                    <img src="https://www.freeiconspng.com/uploads/silver-shopping-cart-icon-14.png" className="cart-png" alt="cart" />
                                </button>
                                </li>}
                              {isLogin && <li className="nav-item  profile-card">
                                <button className="profile-btn ">
                                    profile
                                </button>
                                </li>
                            }
                              {isLogin && <li className="nav-item">
                                  <button className="nav-link option loged-btns p-2 m-2 text-white" onClick={LogOutOff}>Logout</button>
                              </li>
                              }
                              
                              </ul>
                          </div>
                      </nav>
                  </div>
            </div>
        </div>
      </div> 
    )
}

export default NavBAr