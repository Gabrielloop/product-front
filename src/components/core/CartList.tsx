import React from "react";
import { CartProps } from "../../@types/Types";
import { useNavigate } from "react-router-dom";
import CartSelector from "./CartSelector";
import { formatCurrency } from "services/formatCurrency";

const CartList: React.FC<CartProps> = ({ product, quantity }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="cart-item" key={product.productId}>
        <div>
          <img src={product.productImage} alt={product.productName} />
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("../product/" + product.productId);
          }}
        >
          <h3>{product.productName}</h3>
        </div>
        <span style={{ textAlign: "right" }}>
          {formatCurrency(product.productPrice)}
        </span>
        <span style={{ textAlign: "right" }}>
          {formatCurrency(product.productPrice * quantity)}
        </span>
        <CartSelector product={product} />
        <div id="cart-quantity">x {quantity}</div>
      </div>
    </>
  );
};

export default CartList;
