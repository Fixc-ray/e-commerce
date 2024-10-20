import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    if (isToggled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isToggled]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className={`navbar ${isToggled ? 'dark-navbar' : ''}`}>

      <div className="navbar-container">

        <div className="navbar-logo">       
            <img className = "logo" src="TasteNshop.jpg" alt="TasteNshop logo" />
        </div>

          <div className="main-menu-container">
            <ul className="menu-list">

              <li className="main-menu-item">
                <Link to="/">Home</Link>
              </li>
              <li className="main-menu-item">
                <Link to="/Footer">About</Link>
              </li>
              <li className="main-menu-item">
                <Link to="/Footer">Services</Link>
              </li>
              <li className="main-menu-item">
              <Link to="/cart">Cart</Link>
              </li>
              <li className="main-menu-item">
              <Link to="/wishlist">Wishlist</Link>
              </li>
            
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
            <button className="wishlist-button">
              <Link to="/cart">Wishlist</Link>
            </button>
          </div>

      </div>

    </div>
  )
}

export default Navbar;