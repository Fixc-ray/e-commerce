import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Details from './Details';
import Search from "./Search";
import "./Home.css";

function Home({ onAddToCart }) {
  const url = "http://127.0.0.1:5000/api/products";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = () => navigate("/register");
  const handleSignIn = () => navigate("/login");
  const handleContinue = () => navigate("/Products");

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError("User is not authenticated. Please log in!");
        return;
      }

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  if (!localStorage.getItem('token')) {
    return (
      <div className="Front">
        <div className="overlay">
          <div className="text-overlay">
            <h1>
              TASTE<span className="italic">N</span>SHOP
            </h1>
            <h3>
              Your One Stop <br />
              Shop For All <br /> Shopping Items
            </h3>
          </div>
          <div className="Sign">
            <h1>Create An Account With Us</h1>
            <button onClick={handleSignUp} className="btn mb-2">Sign Up</button>
            <h1>Already Have An Account?</h1>
            <button onClick={handleSignIn} className="btn mb-2">Sign In</button>
            <h1>Continue Without An Account</h1>
            <button onClick={handleContinue} className="btn mb-2">Continue</button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-page">
      <Search items={products} onAddToCart={onAddToCart} />
      <div className="product-list">
        {products.map(product => (
          <Details 
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;


// import React, { useEffect, useState } from "react";
// import Details from './Details';
// import Search from "./Search";

// function Home({ onAddToCart }) {
//   const url = "http://127.0.0.1:5000/api/products";
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const token = localStorage.getItem('token');

//       if (!token) {
//         setError("User is not authenticated. Please log in!");
//         return;
//       }
      
//       try {
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch products.');
//         }

//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         setError(error.message || "Failed to load products.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [url]);

  
//   if (loading) {
//     return (
//       <div>
//         <div>Loading...</div>
//       </div>
//     );
//   }


//   if (error) {
//     return (
//       <div>{error}</div>
//     );
//   }

//   return (
//     <div>
//       <div className="">
//         <Search 
//           items={products}
//           onAddToCart={onAddToCart}
//         />
//       </div>
//       <div className="product-list">
//         {products.map(product => (
//           <Details 
//             key={product.id}
//             product={product}
//             onAddToCart={onAddToCart}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;