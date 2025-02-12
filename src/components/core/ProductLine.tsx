import React from "react";
import { Product } from "../../@types/Types";

const ProductLine: React.FC<Product> = (product) => {
  return (
    <>
      <td>
        <b>{product.productName}</b>
      </td>
      <td>{product.productPrice}</td>
      <td>({product.productStock})</td>
      <td>Panier</td>
    </>
  );
};

export default ProductLine;
