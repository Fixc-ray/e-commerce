import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Protected = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/protected', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
      } catch (error) {
        alert('Unauthorized! Please log in.');
        navigate('/login');
      }
    };

    fetchProtectedData();
  }, [navigate, token]);

  return <div>{message}</div>;
};

export default Protected;
