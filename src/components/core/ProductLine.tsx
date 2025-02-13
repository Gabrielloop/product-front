import React from "react";
import { Product } from "../../@types/Types";
import CartSelector from "./CartSelector";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "services/formatCurrency";

const ProductLine: React.FC<Product> = (product) => {
  const navigate = useNavigate();

  return (
    <>
      <td>
        <img src={product.productImage} className="line-image" />
      </td>
      <td
        className="list-product-name"
        onClick={() => {
          navigate("../product/" + product.productId);
        }}
      >
        {product.productName}
      </td>
      <td>{formatCurrency(product.productPrice)}</td>
      <td>
        <CartSelector product={product} />
      </td>
    </>
  );
};

export default ProductLine;
