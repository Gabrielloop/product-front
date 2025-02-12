import React, { useEffect, useState } from "react";
import { BehaviorSubject, Subscription } from "rxjs";
import { CartProps, Product, CartSelectorProps } from "../../@types/Types";
import { cartObservable } from "../../pages/Cart";

// L'observable du panier est importé depuis la page Cart

const CartSelector: React.FC<CartSelectorProps> = ({ product }) => {
  const [cart, setCart] = useState<CartProps[]>(() => {
    // Initialisation du local storage
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  useEffect(() => {
    const subscription: Subscription = cartObservable.subscribe((newCart) => {
      setCart(newCart);
      // Enregistrement du panier dans le local storage
      localStorage.setItem("cart", JSON.stringify(newCart));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleModifyCart = (e: React.ChangeEvent<HTMLInputElement>) => {
    let quantity = parseInt(e.target.value);

    // Contrôle de la quantité
    if (isNaN(quantity) || quantity < 0) {
      quantity = 0;
    } else if (quantity > product.productStock) {
      quantity = product.productStock;
    }
    e.target.value = quantity.toString();

    if (quantity >= 0) {
      const updateCart = [...cart];
      const existingProductIndex = updateCart.findIndex(
        (item) => item.product && item.product.productId === product.productId
      );

      if (existingProductIndex > -1) {
        if (quantity === 0) {
          // Si la quantité est 0, on retire le produit du panier
          updateCart.splice(existingProductIndex, 1);
        } else {
          // Sinon, on met à jour la quantité
          updateCart[existingProductIndex].quantity = quantity;
        }
      } else if (quantity > 0) {
        // Si le produit n'est pas dans le panier et que la quantité est supérieure à 0, on l'ajoute
        updateCart.push({ product, quantity });
      }

      // On met à jour le panier
      setCart(updateCart);
      localStorage.setItem("cart", JSON.stringify(updateCart));
      cartObservable.next(updateCart);
      console.log("Cart updated", updateCart);
    }
  };

  return (
    <div>
      <input
        className="add-to-cart"
        type="number"
        name="number"
        min="0"
        max={product.productStock}
        defaultValue={
          cart.find(
            (item) =>
              item.product && item.product.productId === product.productId
          )?.quantity || 0
        }
        onChange={handleModifyCart}
      />
    </div>
  );
};

export default CartSelector;
