import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="navbar">

      <div className="navbar-container">

        <div className="navbar-logo">       
            <img className = "logo" src="TasteNshop.png" alt="TasteNshop logo" />
        </div>

          <div className="main-menu-container">
            <ul className="menu-list">
              <li className="main-menu-item-active">Home</li>
              <li className="main-menu-item">Categories</li>
              <li className="main-menu-item">Services</li>
              <li className="main-menu-item">More</li>
            </ul>
          </div>

          <div className = "profile-container">
                <img className= "profile-picture" src="system-regular-8-account.gif" alt="Profile" />
                    <div  className = "profile-text-container">
                        {/* <span class = "profile-text">Profile</span> */}
                        {/* <i class="fa-solid fa-down-long"></i> */}
                    </div>
                <div className = "toggle" onClick={handleToggle}>
                <div className={`toggle-ball ${isToggled ? 'active' : ''}`}></div>
                <i className={`fa-solid ${isToggled ? 'fa-sun' : 'fa-moon'} toggle-icon`}></i>
                    {/* <div class= "toggle-ball-light"></div> */}
                </div>
            </div>


          <div className="wishlist">
            <button className="wishlist-button">Wishlist</button>
          </div>

          <div className="cart">
            <button className="add-to-cart-btn">
              <Link to="/cart">CART</Link>
            </button>
          </div>

      </div>

    </div>
  )
}

export default Navbar