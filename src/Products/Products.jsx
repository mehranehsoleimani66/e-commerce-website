import { useEffect, useState } from "react";
import { getAllProducts } from "../api/getAllProducts";

const Products = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => {
      setItems(res.products);
      console.log(res.products, "mmm");
    });
  }, []);

  return <div>itemmmms</div>;
};

export default Products;
