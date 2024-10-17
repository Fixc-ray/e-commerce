import React, { useState } from 'react';
import Details from './Details';

function Search({ items, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleInputChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setCategory(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

  const filtered = items.filter((product) => {
    const matchesCategory = category ? product.category === category : true;
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMinPrice = minPrice
      ? product.price >= parseFloat(minPrice)
      : true;
    const matchesMaxPrice = maxPrice
      ? product.price <= parseFloat(maxPrice)
      : true;
    return (
      matchesCategory &&
      matchesSearchTerm &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  return (
    <div className="flex">
      <div className="flex flex-col md:flex-row mt-10 mx-4">
        <div className="w-full md:w-1/4 mb-6 md:mb-0 md:mr-4">
          <h1 className="text-2xl font-bold mb-4">Select Further</h1>
          <select
            className="w-full p-2 border border-gray-400 rounded shadow-md"
            value={category}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Foodstuff">Foodstuff</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Outdoor Gear">Outdoor Gear</option>
          </select>
          <div className="flex flex-col mt-4 space-y-2">
            <input
              className="w-full p-2 border border-gray-400 rounded shadow-md"
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <input
              className="w-full p-2 border border-gray-400 rounded shadow-md"
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>

        <div className="flex flex-col flex-grow">
          <input
            className="w-full p-2 border border-gray-400 rounded shadow-md mb-4"
            type="text"
            placeholder="Discover Products..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <div className="flex flex-wrap justify-center gap-4">
            {filtered.map((product) => (
              <Details key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
