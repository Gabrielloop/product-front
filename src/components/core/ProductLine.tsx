import React from "react";
import { Product } from "../../@types/Types";
import CartSelector from "./CartSelector";
import { useNavigate } from "react-router-dom";

const ProductLine: React.FC<Product> = (product) => {
  const navigate = useNavigate();

  return (
    <>
      <td
        className="list-product-name"
        onClick={() => {
          navigate("../product/" + product.productId);
        }}
      >
        {product.productName}
      </td>
      <td>{product.productPrice}</td>
      <td>
        <CartSelector
          stock={product.productStock}
          articleId={product.productId}
        />
      </td>
    </>
  );
};

export default ProductLine;
