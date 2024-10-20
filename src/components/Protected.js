import React, { useState } from 'react';
import axios from 'axios';

function Protected() {
  const [message, setMessage] = useState('');

  const fetchProtected = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://127.0.0.1:5000/protected', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
    } catch (error) {
      alert('You are not authorized!');
    }
  };

  return (
    <div>
      <h2>Protected Route</h2>
      <button onClick={fetchProtected}>Fetch Protected Data</button>
      <p>{message}</p>
    </div>
  );
}

export default Protected;
