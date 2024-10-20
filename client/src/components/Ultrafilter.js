import React, {useState} from 'react';

function Ultrafilter({onFilter}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilterChange = () => {
    onFilter({
      searchTerm,
      category,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    });
  };
  
  return (
    <div className="filter-container mt-20">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={handleFilterChange}
      />
      <select
        className="category-dropdown"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onBlur={handleFilterChange}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="foodstuff">Foodstuff</option>
        <option value="homedecor">Homedecor</option>
        <option value="home">Home</option>
      </select>
      
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        onBlur={handleFilterChange}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        onBlur={handleFilterChange}
      />
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
}

export default Ultrafilter;