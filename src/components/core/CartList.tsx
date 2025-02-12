import React from "react";
import { CartProps } from "../../@types/Types";
import { useNavigate } from "react-router-dom";
import CartSelector from "./CartSelector";

const CartList: React.FC<CartProps> = ({ product, quantity }) => {
  // Récupération depuis l'API des informations du produit

  const navigate = useNavigate();

  return (
    <li key={product.productId}>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("../product/" + product.productId);
        }}
      >
        {product.productName}
      </span>
      - {quantity}
      <CartSelector product={product} />
    </li>
  );
};

export default CartList;
