import React, { useEffect, useState } from "react";

export default function GetAllProduct() {
  type ProductType = {
    id: string;
    product_name: string;
    image: string;
    pricr: number;
    quantity: number;
    created_at: string;
  };
  const [products, setProduct] = useState<ProductType[]>([]);
  const getAllProduct = async () => {
    fetch("http://localhost:3000/product")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((error) => console.log("Error: ", error));
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return <div>GetAllProduct</div>;
}
