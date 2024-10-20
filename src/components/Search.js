import React, { useState } from "react";
import Details from "./Details";

function Search({ items, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setCategory(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const filtered = items.filter((product) => {
    const matchesCategory = category ? product.category === category : true;
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesMinPrice = minPrice ? product.price >= parseFloat(minPrice) : true;
    const matchesMaxPrice = maxPrice ? product.price <= parseFloat(maxPrice) : true;
    return (
      matchesCategory && matchesSearchTerm && matchesMinPrice && matchesMaxPrice
    );
  });

  return (
    <div className="mt-16 flex">
      <div className="w-60 mt-14 ml-4">
        <h1 className="heading text-2xl">SELECT</h1>
        <select
          className="mt-2"
          value={category}
          onChange={handleFilterChange}
          onBlur={handleFilterChange}
        >
          <option value="">All Categories</option>
          <option value="Gadgets">Gadgets</option>
          <option value="Foodstuff">Foodstuff</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Home Appliances">Home Appliance</option>
          <option value="Outdoor Gear">Outdoor Gear</option>
        </select>
        <div className="mt-4">
          <input
            className="price-input border border-grey-400 shadow-md"
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <input
            className="price-input border border-grey-400 shadow-md m-2"
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>

      <div className="mt-3">
        <input
          className="search-input border border-grey-400 shadow-md"
          type="text"
          placeholder="DISCOVER PRODUCTS..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className="flex flex-wrap justify-center">
          {filtered.map((product) => (
            <Details key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
