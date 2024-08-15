import React from 'react';

function Navbar() {
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
                <img className= "profile-picture" src="anotherprofile.png" alt="" />
                    <div  class = "profile-text-container">
                        {/* <span class = "profile-text">Profile</span> */}
                        {/* <i class="fa-solid fa-down-long"></i> */}
                    </div>
                <div class  = "toggle">
                    <i class="fa-solid fa-moon toggle-icon"></i>
                    <i class="fa-solid fa-sun toggle-icon"></i>
                    <div class= "toggle-ball-light"></div>
                </div>
            </div>


          <div className="wishlist">
            <button className="wishlist-button">Wishlist</button>
          </div>

      </div>

    </div>
  )
}

export default Navbar