import { CartProps } from "../@types/Types";
import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { cartObservable } from "../pages/Cart";

const NavBar: React.FC = () => {
  const links = [
    { href: "/about", text: "About" },
    { href: "/products", text: "Nos produits" },
    { href: "/dashboard", text: "Connexion" },
  ];

  const navigate = useNavigate();
  const [cart, setCart] = useState<CartProps[]>([]);
  const [cartSize, setCartSize] = useState<number>(0);

  useEffect(() => {
    const subscription = cartObservable.subscribe((newCart) => {
      setCart(newCart);
      setCartSize(newCart.reduce((acc, item) => acc + item.quantity, 0));
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav>
      <h1>Boutique Pokémon</h1>
      <ul>
        {links.map((link) => (
          <li
            key={link.href}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(link.href)}
          >
            {link.text}
          </li>
        ))}
        <li
          key={"/cart"}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/cart")}
        >
          Panier
          {/* Affichage du nombre d'articles dans le panier */}
          {cartSize > 0 && <span> ({cartSize})</span>}{" "}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
