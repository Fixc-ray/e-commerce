import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();
  const profile = () => {
    navigate('/profile');
  };

  // const handleLogout = () => { 
  //   onLogout();
  //   navigate("/login"); 
  // };

  return (
    <div className={`navbar ${isToggled ? 'dark-navbar' : ''}`}>

      <div className="navbar-container">

        <div className="navbar-logo">       
            <img className = "logo" src="TasteNshop.jpg" alt="The TasteNshop logo" />
        </div>

          <div className="main-menu-container">
            <ul className="menu-list">

              <li className="main-menu-item">
                <Link to="/home">Home</Link>
              </li>
              <li className="main-menu-item">
                <Link to="/Products">Products</Link>
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
                <img onClick={profile} className= "profile-picture" src="anotherprofile.png" alt="Profile" />
                     <div  className = "profile-text-container">
                        {/* <span class = "profile-text">Profile</span> */}
                        {/* <i class="fa-solid fa-down-long"></i> */}
                    </div> 

                <div className = "toggle" onClick={handleToggle} aria-label="Toggle dark mode">
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