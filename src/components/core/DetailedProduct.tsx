import React from "react";
import { Product } from "../../@types/Types";
import { formatCurrency } from "services/formatCurrency";
import CartSelector from "./CartSelector";

const DetailedProduct: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div id="detailed-product">
      <img
        src={product.productImage}
        alt={product.productName}
        className="detailed-image"
      />
      <h3>{product.productName}</h3>
      <p>{product.productDescription}</p>
      <div className="detailed-product-infos">
        <span>Stock: {product.productStock}</span>
        <span>{formatCurrency(product.productPrice)}</span>
      </div>
      <CartSelector product={product} />
    </div>
  );
};

export default DetailedProduct;
