// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ProtectedRoute = () => {
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchProtectedData = async () => {
//       try {
//         const res = await axios.get('http://127.0.0.1:5000/protected', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setMessage(res.data.message);
//       } catch (error) {
//         alert('Unauthorized! Please log in.');
//         navigate('/login');
//       }
//     };

//     fetchProtectedData();
//   }, [navigate, token]);

//   return <div>{message}</div>;
// };

// export default ProtectedRoute;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? children : null;
}

export default ProtectedRoute;