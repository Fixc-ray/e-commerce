import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Details from './components/Details';
import Register from './components/Register';
import Login from './components/Login';
import profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [cartItems, setCartItems] = useState([]);
  
    const onAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    window.alert(`${product.name} has been added to cart`);
  };

  const removeItem = (id) => {
      setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const token = localStorage.getItem('token');

  return (
      <Router>
        <div className="App">
          <Navbar cartCount={cartItems.length} /> {/* Pass cart count to Navbar */}
          <Routes>
            <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
            <Route path="/home" element={
                <ProtectedRoute>
                  <Home onAddToCart={onAddToCart} />
                </ProtectedRoute>
              } />
              <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart
                      cartItems={cartItems}
                      removeFromCart={removeItem}
                      updateCartQuantity={updateCartQuantity}
              />
            </ProtectedRoute>
          } />
          <Route path="/details" element={
              <ProtectedRoute>
                <Details onAddToCart={onAddToCart} />
              </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <profile />
            </ProtectedRoute>
          }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;




// import './App.css';
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './components/Home';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Cart from './components/Cart';
// import Details from './components/Details';
// import Register from './components/Register';
// import Login from './components/Login';
// import ProtectedRoute from './components/ProtectedRoute';
// import Products from "./components/Products";
// import Profile from "./components/Profile";
// import MyProducts from "./components/Myproducts";
// import ProductForm from './components/ProductForm';
// import ProductList from './components/ProductList';

// function App() {
//   const [cartItems, setCartItems] = useState([]);

//   const onAddToCart = (product) => {
//       setCartItems(prevItems => {
//           const existingItem = prevItems.find(item => item.id === product.id);
//           if (existingItem) {
//               return prevItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevItems, { ...product, quantity: 1 }];
//       }
//     });
//     window.alert(`${product.name} has been added to cart`)
//   };

//   const removeItem = (id) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
//   };

//   const updateCartQuantity = (id, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const ProtectedRoute = ({ children }) => {
//       const token = localStorage.getItem('token');
//     return token ? children : <Navigate to="/login" />;
//   };
  
//   return (
//     <Router>
//       <div className="App">
//         <Navbar />
//         <Routes>
//         <Route path="/" element={<Navigate to="/home" />} />
//           <Route path="/home" element={<Home />} />
//           <Route
//             path="/products"
//             element={<Products onAddToCart={onAddToCart} />}
//           />
//           <Route path="/product" element={<ProductList />} />
//           <Route path="/add-product" element={<ProductForm />} />
//           <Route
//             path="/edit-product/:productId"
//             element={<ProductForm isEdit />}
//           />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
          
//           <Route
//             path="/my-products"
//             element={
//               <ProtectedRoute>
//                 <MyProducts />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/cart"
//             element={
//               <Cart
//                 cartItems={cartItems}
//                 removeFromCart={removeItem}
//                 updateCartQuantity={updateCartQuantity}
//               />
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/details"
//             element={<Details onAddToCart={onAddToCart} />}
//           />
//           <Route path="*" element={<Navigate to="/home" />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
