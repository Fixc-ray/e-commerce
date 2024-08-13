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
<<<<<<< HEAD
    <div><p>lorem</p></div>
=======
    <div>
    {DisplayItems}
  </div>
>>>>>>> 09865748c2e462919d2a0b65d384e096ad4ca0f6
  )
  
}

export default Home;
