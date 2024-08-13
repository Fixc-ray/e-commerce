import React from 'react'
import { useEffect , useState } from 'react';

function Search() {
  let productData=[];

  const [searchTerm , setSearchTerm] =useState('');
  

  const filteredProducts = productData.filter(product=>
    product.name.toLowerCase().includes(searchTerm)|| product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
    return(
      <div>
      <input className="search-input" type="text" placeholder="DISCOVER PRODUCTS..." value={searchTerm}
       />
       <div>
       {filteredProducts.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <p>{product.description}</p>
            </div>
       ))}
       </div>
      </div>
    );
      }

export default Search