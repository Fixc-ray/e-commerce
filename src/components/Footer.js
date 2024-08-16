import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">

          <div className="col-md-6">
            <h4>ABOUT US</h4>
            <p>
              Welcome to TasteNshop, your one-stop destination for many products, e.g., food stuffs, electronic gadgets, home decor, etc. We are committed to providing our customers with a seamless shopping experience, offering a wide range of high-quality products at an affordable price and great customer service. Thank you for choosing us as your trusted shopping partner.
            </p>
          </div>

          <div className="col-md-6">
            <h4>CONTACTS</h4>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt" /> Nairobi, Kenya.
              </li>
              <li>
                <i className="fas fa-phone" /> 0112673864876
              </li>
              <li>
                <i className="fas fa-envelope" /> <a href="mailto:tastenshop@gmail.com">tastenshop@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <p className="copyright">
          &copy; 2024 E-commerce Website. All rights reserved.
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;