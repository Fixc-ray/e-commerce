import React, { useState } from "react";

function Cart({ cartItems = [], removeFromCart, updateCartQuantity }) {
  const totalPrice = cartItems.reduce(
    (total, products) => total + products.price * products.quantity,
    0
  );

  useEffect(() => {
    fetch("https://e-commerce-silk-xi-95.vercel.app/products")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(error => console.log("Error Fetching Cart Items", error));
  }, []);

  const calculateTotal = () => {
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.price * (item.quantity || 1); 
    }
    return totalPrice.toFixed(2);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddToCart = (product) => {
    setItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    return (
    <div className='cart'>
      <h1>Shopping Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="flex-grow container mx-auto mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((products) => (
              <div key={products.id} className="cart-food border p-4 rounded shadow-md">
                <img
                  src={products.imageUrl}
                  alt={products.photoUrl}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-xl mb-3 font-semibold">{products.name}</h3>
                <p>Price: KSH {products.price}</p>

                <div className="flex items-center ml-28 pl-8 space-x-4">
                  <button
                    onClick={() => updateCartQuantity(products.id, products.quantity - 1)}
                    className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                    disabled={products.quantity <= 1}
                  >
                    -
                  </button>
                  <p className="text-lg">{products.quantity}</p>
                  <button
                    onClick={() => updateCartQuantity(products.id, products.quantity + 1)}
                    className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>

                <p>Total for this item: KSH {products.price * products.quantity}</p>

                <button
                  onClick={() => removeFromCart(products)}
                  className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-700 mt-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white shadow-md p-4 text-right mt-10">
            <h2 className="text-2xl font-semibold">Total: KSH {totalPrice}</h2>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded shadow-md hover:bg-green-700 mt-4"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
