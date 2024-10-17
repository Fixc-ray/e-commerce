
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { WishlistProvider } from './components/WishlistContext'; // Import the WishlistProvider

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <WishlistProvider>
          <App />
        </WishlistProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);