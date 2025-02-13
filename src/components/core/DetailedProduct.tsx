import React from "react";
import { Product } from "../../@types/Types";

const DetailedProduct: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div>
      <img
        src={product.productImage}
        alt={product.productName}
        className="detailed-image"
      />
      <h3>{product.productName}</h3>
      <p>{product.productDescription}</p>
      <p>{product.productPrice}</p>
    </div>
  );
};

export default DetailedProduct;
