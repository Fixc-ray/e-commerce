import React, { useState } from "react";
import Details from "./Details";

function Search({ items, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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
      matchesCategory && matchesSearchTerm && matchesMinPrice && matchesMaxPrice
    );
  });

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-between mt-20">
      <div className="flex flex-col space-y-4">
        <select
          className="border p-2"
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
        <input
          type="number"
          className="border p-2"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          type="number"
          className="border p-2"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>

      <input
        type="text"
        className="flex-1 border p-2"
        placeholder="Search Products..."
        value={searchTerm}
        onChange={handleInputChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filtered.map((product) => (
          <Details key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default Search;
