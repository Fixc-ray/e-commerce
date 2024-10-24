import React, { useEffect, useState } from "react";
import Details from './Details';
import Search from "./Search";

function Home({ onAddToCart }) {
  const url = "http://127.0.0.1:5000/api/products";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Add the Authorization header
            'Content-Type': 'application/json' // Optional: specify content type
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products.'); // Handle non-2xx responses
        }

        const data = await response.json(); // Parse the response to JSON
        setProducts(data); // Set the products state
      } catch (error) {
        setError(error.message || "Failed to load products."); // Handle errors
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchProducts(); // Call the fetch function
  }, [url]); // You can include url as a dependency if it might change

  // Render loading state
  if (loading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }


  if (error) {
    return (
      <div>{error}</div>
    );
  }

  return (
    <div>
      <div className="">
        <Search 
          items={products}
          onAddToCart={onAddToCart}
        />
      </div>
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
//   const url = "http://127.0.0.1:8080/api/products";
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//         setError("Failed to load products.");
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-xl font-semibold">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 font-semibold mt-10">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <div className="search-bar-container">
//         <Search 
//           items={products}
//           onAddToCart={onAddToCart}
//         />
//       </div>
//       <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//         {products.map((product) => (
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