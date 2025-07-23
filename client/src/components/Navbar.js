import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar({ cartCount = 0 }) {
  const [isToggled, setIsToggled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user is logged in and get username
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setIsLoggedIn(true);
        setUsername(user.username);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsLoggedIn(false);
        setUsername('');
      }
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }

    if (isToggled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isToggled]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();
  const location = useLocation();
  
  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  return (
    <nav className={`epic-navbar ${isToggled ? 'dark-mode' : ''}`}>
      <div className="epic-navbar-container">
        
        {/* Logo Section - Left */}
        <div className="epic-logo-section">
          <Link to="/home" className="epic-logo">
            <img 
              className="epic-logo-img" 
              src="TasteNshop.jpg" 
              alt="TasteNShop Logo" 
            />
            <span className="epic-logo-text">TasteNShop</span>
          </Link>
        </div>

        {/* Navigation Menu - Center */}
        <div className="epic-nav-menu">
          <ul className="epic-nav-list">
            <li className="epic-nav-item">
              <Link to="/home" className="epic-nav-link">Home</Link>
            </li>
            <li className="epic-nav-item">
              <Link to="/products" className="epic-nav-link">Products</Link>
            </li>
            <li className="epic-nav-item">
              <Link to="/categories" className="epic-nav-link">Categories</Link>
            </li>
            <li className="epic-nav-item">
              <Link to="/deals" className="epic-nav-link">Deals</Link>
            </li>
            <li className="epic-nav-item">
              <Link to="/support" className="epic-nav-link">Support</Link>
            </li>
          </ul>
        </div>

        {/* User Actions - Right */}
        <div className="epic-user-actions">
          
          {/* Cart - Only show when logged in */}
          {isLoggedIn && (
            <Link to="/cart" className="epic-cart-btn">
              <span className="epic-cart-icon">🛒</span>
              <span className="epic-cart-text">Cart</span>
              {cartCount > 0 && (
                <span className="epic-cart-count">{cartCount}</span>
              )}
            </Link>
          )}

          {/* Wishlist - Only show when logged in */}
          {isLoggedIn && (
            <Link to="/wishlist" className="epic-wishlist-btn">
              <span className="epic-wishlist-icon">❤️</span>
              <span className="epic-wishlist-text">Wishlist</span>
            </Link>
          )}

          {/* Profile/Sign In Button - Hide on /login and /register */}
          {!(location.pathname === '/login' || location.pathname === '/register') && (
            <button onClick={handleProfileClick} className="epic-profile-btn">
              <span className="epic-profile-icon">👤</span>
              <span className="epic-profile-text">
                {isLoggedIn ? username : 'Sign In'}
              </span>
            </button>
          )}

          {/* Theme Toggle */}
          <button 
            onClick={handleToggle} 
            className="epic-toggle-btn"
            aria-label="Toggle dark mode"
          >
            <div className={`epic-toggle ${isToggled ? 'active' : ''}`}>
              <div className="epic-toggle-ball"></div>
              <span className="epic-toggle-icon">
                {isToggled ? '☀️' : '🌙'}
              </span>
            </div>
          </button>

          {/* Logout - Only show when logged in */}
          {isLoggedIn && (
            <button onClick={handleLogout} className="epic-logout-btn">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle - Only show when needed */}
        <button 
          className={`epic-mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="epic-mobile-menu-icon">
            {isMobileMenuOpen ? '✕' : '☰'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`epic-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="epic-mobile-menu-container">
          <ul className="epic-mobile-nav-list">
            <li className="epic-mobile-nav-item">
              <Link to="/home" className="epic-mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li className="epic-mobile-nav-item">
              <Link to="/products" className="epic-mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Products
              </Link>
            </li>
            <li className="epic-mobile-nav-item">
              <Link to="/categories" className="epic-mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Categories
              </Link>
            </li>
            <li className="epic-mobile-nav-item">
              <Link to="/deals" className="epic-mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Deals
              </Link>
            </li>
            <li className="epic-mobile-nav-item">
              <Link to="/support" className="epic-mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;