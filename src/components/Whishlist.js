
import React from 'react';
import { useWishlist } from './WishlistContext';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist">
      <h2 className="text-2xl font-semibold m-3">My Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.length > 0 ? (
          wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item">
              <img
                className="w-24 h-24 object-cover rounded"
                src={item.photoUrl}
                alt={item.name}
              />
              <div className="item-details">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <button
                  className="remove-from-wishlist-button bg-red-500 text-white px-4 py-2 rounded mt-2"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Wishlist;