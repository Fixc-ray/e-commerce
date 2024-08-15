import React, { useEffect, useState } from "react";
import Details from "./Details";
import Search from "./Search";
import Ultrafilter from "./Ultrafilter";

function Home() {
  const url = "https://e-commerce-silk-xi-95.vercel.app/products";
  const [products, setProducts]= useState([])
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error))
  })
  const DisplayItems = products.map((product)=> <Details key={product.id} product={product}/>)
  return (
    <div>
    <Ultrafilter/>
    <Search items={products}/>
    <div>
      
    </div>
    
  </div>
  )
  
}

export default Home;
