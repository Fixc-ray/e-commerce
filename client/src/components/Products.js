import React, { useEffect, useState } from "react";
import Details from "./Details";
import Search from "./Search";

function Home({ onAddToCart, onRemoveItem }) {
  const url = "http://127.0.0.1:5000/api/products";
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
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

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">{error}</div>;
  }

  if (selectedProduct) {
    return (
      <div className="container mx-auto p-6">
        <button
          className="mb-4 px-4 py-2 bg-gray-300 rounded"
          onClick={() => setSelectedProduct(null)}
        >
          Back to Products
        </button>
        <Details product={selectedProduct} onAddToCart={onAddToCart} />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <Search items={products} onAddToCart={onAddToCart} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="award-product-card cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center p-6 border border-gray-200 hover:border-blue-400 transition-all duration-300">
              <img src={product.photoUrl} alt={product.name} className="product-image w-48 h-48 object-cover rounded-xl mb-4 border-4 border-blue-100 shadow-md hover:border-blue-400 transition-all duration-300" />
              <h3 className="font-extrabold text-xl text-gray-800 mb-2 text-center tracking-tight award-product-title">{product.name}</h3>
              <p className="text-lg font-semibold text-blue-600 mb-2">${product.price}</p>
              <p className="text-gray-500 text-sm mb-4 text-center award-product-desc">{product.description}</p>
              <button
                className="award-add-to-cart-btn bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-bold shadow hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                onClick={e => { e.stopPropagation(); onAddToCart(product); }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;