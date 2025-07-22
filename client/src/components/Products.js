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

  // Otherwise, show the product list
  return (
    <div className="container mx-auto p-6">
      <Search items={products} onAddToCart={onAddToCart} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            {/* You can show a summary here, or reuse Details with less info */}
            <div className="p-4 border rounded shadow hover:bg-gray-100">
              <h3 className="font-bold">{product.name}</h3>
              <p>${product.price}</p>
              {/* Optionally show image, etc. */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;