import React, { useEffect, useState } from "react";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CartProps } from "../@types/Types";
import CartList from "components/core/CartList";
import EmptyCart from "layout/EmptyCart";

export const cartObservable: BehaviorSubject<CartProps[]> = new BehaviorSubject<
  CartProps[]
>([]);

const Cart: React.FC = () => {
  const [productsInCart, setProductsInCart] = useState<CartProps[]>([]);
  const [cartSize, setCartSize] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [mail, setMail] = useState<string>("");

  // récupération du panier
  useEffect(() => {
    const subscription = cartObservable.subscribe((newCart) => {
      setProductsInCart(newCart);
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

  const handleMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  const handleOrder = () => {
    const products = productsInCart.map((product) => ({
      productId: product.product.productId,
      quantity: product.quantity,
      total: product.quantity * product.product.productPrice,
    }));
    const totalCommand = products.reduce((acc, item) => acc + item.total, 0);

    console.log(
      "Commande envoyée",
      products,
      " mail : ",
      mail,
      "total",
      totalCommand
    );

    // POST vers l'api pour enregistrer la commande

    // si return true : vider le panier
    console.log("Commande enregistrée : panier vidé");
    cartObservable.next([]);
  };

  return (
    <div>
      <h2>Panier</h2>
      {cartSize === 0 && <EmptyCart />}
      {cartSize === 1 && <span>{cartSize} Article</span>}
      {cartSize > 1 && <span>{cartSize} Articles</span>}
      <ul>
        {productsInCart.map((product) => (
          <CartList key={product.product.productId} {...product} />
        ))}
      </ul>
      <h3>Total: {cartTotal} €</h3>

      <input onChange={handleMail} type="text" placeholder="votre mail" />
      <button onClick={handleOrder}>commander</button>
    </div>
  );
};
export default Cart;
