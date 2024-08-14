import React, { useEffect, useState } from "react";
import Details from "./Details";
import Search from "./Search";

function Home() {
  const url = "http://localhost:3000/products";
  const [products, setProducts]= useState([])
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error))
  })
  const DisplayItems = products.map((product)=> <Details key={product.id} products={product}/>)
  return (
    <div>
    <Search/>
    <div className="flex flex-wrap justify-end">
    {DisplayItems}
    </div>
    
  </div>
  )
  
}

export default Home;
