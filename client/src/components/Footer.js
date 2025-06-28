import React, { useEffect, useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // checks if the dark mode is active
    const checkDarkMode = () => {
      const body = document.body;
      setIsDarkMode(body.classList.contains('dark-mode'));
    };

    // check initially
    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className={`epic-footer ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="epic-footer-container">
        
        <div className="epic-footer-content">
          
          <div className="epic-footer-section">
            <h3 className="epic-footer-title">About Us</h3>
            <div className="epic-footer-about">
              <p className="epic-footer-text">
                Welcome to <span className="epic-footer-brand">TasteNShop</span>, your one-stop destination for premium products. 
                We offer a curated selection of food items, electronic gadgets, home decor, and much more.
              </p>
              <p className="epic-footer-text">
                Our mission is to provide you with a seamless shopping experience, combining quality products, 
                competitive prices, and exceptional customer service. Thank you for choosing us as your trusted shopping partner.
              </p>
            </div>
          </div>

          <div className="epic-footer-section">
            <h3 className="epic-footer-title">Contact Us</h3>
            <div className="epic-footer-contact">
              <div className="epic-contact-item">
                <span className="epic-contact-icon">📍</span>
                <span className="epic-contact-text">Nairobi, Kenya</span>
              </div>
              <div className="epic-contact-item">
                <span className="epic-contact-icon">📞</span>
                <span className="epic-contact-text">+254 112 673 864 876</span>
              </div>
              <div className="epic-contact-item">
                <span className="epic-contact-icon">✉️</span>
                <a href="mailto:tastenshop@gmail.com" className="epic-contact-link">
                  tastenshop@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="epic-footer-section">
            <h3 className="epic-footer-title">Quick Links</h3>
            <div className="epic-footer-links">
              <a href="/home" className="epic-footer-link">Home</a>
              <a href="/products" className="epic-footer-link">Products</a>
              <a href="/categories" className="epic-footer-link">Categories</a>
              <a href="/deals" className="epic-footer-link">Deals</a>
              <a href="/support" className="epic-footer-link">Support</a>
            </div>
          </div>

        </div>

        <div className="epic-footer-bottom">
          <div className="epic-footer-bottom-content">
            <p className="epic-copyright">
              &copy; {currentYear} <span className="epic-footer-brand">TasteNShop</span>. All rights reserved.
            </p>
            <div className="epic-footer-legal">
              <a href="/privacy" className="epic-legal-link">Privacy Policy</a>
              <span className="epic-legal-separator">•</span>
              <a href="/terms" className="epic-legal-link">Terms of Service</a>
              <span className="epic-legal-separator">•</span>
              <a href="/cookies" className="epic-legal-link">Cookie Policy</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;