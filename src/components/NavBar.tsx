import { CartProps } from "../@types/Types";
import React, { use, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { cartObservable } from "../pages/Cart";
import { AuthContext } from "auth/AuthContext";
import { formatCurrency } from "services/formatCurrency";

const NavBar: React.FC = () => {
  const links = [{ href: "/products", text: "Nos produits" }];

  const navigate = useNavigate();
  const [cart, setCart] = useState<CartProps[]>([]);
  const [cartSize, setCartSize] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext?.isLoggedIn;
  const userEmail = authContext?.loginUserEmail;

  useEffect(() => {
    const subscription = cartObservable.subscribe((newCart) => {
      setCart(newCart);
      setCartSize(newCart.reduce((acc, item) => acc + item.quantity, 0));
      setCartTotal(
        newCart.reduce(
          (acc, item) => acc + item.quantity * item.product.productPrice,
          0
        )
      );
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav>
      <h1>Pokémart</h1>
      <ul>
        {links.map((link) => (
          <li
            className="nav-link"
            key={link.href}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(link.href)}
          >
            {link.text}
          </li>
        ))}
        <li
          className="nav-link"
          key={"/dashboard"}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          {/* Afficher le mail si connecté */}
          {isLoggedIn ? "Mon compte" : "Connexion"}
        </li>

        <li
          className="nav-link cart-nav"
          key={"/cart"}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/cart")}
        >
          <span className="cart-logo-nav">🛒</span>
          {cartSize == 0 && <span className="cart-size-nav">Panier vide</span>}
          {cartSize == 1 && (
            <span className="cart-size-nav">{cartSize} article</span>
          )}
          {cartSize > 1 && (
            <span className="cart-size-nav">{cartSize} articles</span>
          )}
          {cartTotal > 0 && (
            <span className="cart-total-nav"> {formatCurrency(cartTotal)}</span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
