import React, { useEffect, useState } from "react";
import Details from "./Details";

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
    {DisplayItems}
  </div>
  )
  
}

export default Home;
