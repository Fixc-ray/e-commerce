import React, { useState } from "react";
import Details from "./Details";

function Search({ items }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filtered = items.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-16">
      <input
        className="search-input border border-grey-400 shadow-md"
        type="text"
        placeholder="DISCOVER PRODUCTS..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="flex flex-wrap justify-end">
        {filtered.map((product) => (
          <Details key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Search;
