import React from 'react';

function Details({ product, onAddToCart}) {

  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   fetch("https://e-commerce-silk-xi-95.vercel.app/products")
  //     .then(response => response.json())
  //     .then(data => setItems(data))
  //     .catch(error => console.log("Error Fetching Cart Items"));
  // }, []);

  // const calculateTotal = () => {
  //   let totalPrice = 0;
  //   for (const item of items) {
  //     totalPrice += item.price * item.quantity; 
  //   }
  //   return totalPrice.toFixed(2);
  // };

  // const removeItem = (id) => {
  //   setItems(items.filter(item => item.id !== id));
  // };

  const handleAddToCart = () => {
    if (typeof onAddToCart === 'function') {
      onAddToCart(product);
    } else {
      console.error('onAddToCart is not a function');
    }
  };

  if (!product) {
    return <p>No product details available.</p>;
}

  return (
    <div className="products-card m-2 shadow-md border w-60">
      <img
        className="w-full h-48 object-cover rounded"
        src={product.photoUrl}
        alt={product.name}
      />
      <h2 className="text-2xl font-semibold m-3">{product.name}</h2>
      <h4 className="description">{product.description}</h4>
      <h4 className="description"> Category: {product.category}</h4>
      <br/>
      <h4 className="description-price">{product.price}</h4>
      <br/>

      <div>
        <button 
          className="add-to-cart-button  px-4 py-2 rounded"
          onClick={handleAddToCart}
          >
          Add to Cart
        </button>  
      </div>
      
    </div>
  );
}

export default Details;
