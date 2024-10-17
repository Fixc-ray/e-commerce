import React, { useEffect, useState } from "react";
// import Details from "./Details";
import Search from "./Search";
// import Ultrafilter from "./Ultrafilter";

function Home() {
  const url = "https://e-commerce-silk-xi-95.vercel.app/products";
  const [products, setProducts]= useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Failed to load products.');
      });
  }, []);

  if (loading) 
    return 
  <div>
     <div>Loading...</div>;
    </div>

  if (error) 
    return 
    <div>{error}</div>;

  return (
    <div className="">
      <Search items={products}/>
    </div>
  )
  
}

export default Home;
