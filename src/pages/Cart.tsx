import React, { useEffect, useState } from "react";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CartProps } from "../@types/Types";
import CartList from "components/core/CartList";
import EmptyCart from "layout/EmptyCart";
import { postApiBack } from "../api/postApiBack";
import { formatCurrency } from "services/formatCurrency";

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

  const handleOrder = async () => {
    const products = productsInCart.map((product) => ({
      productId: product.product.productId,
      quantity: product.quantity,
      total: product.quantity * product.product.productPrice,
    }));

    const totalCommand = products.reduce((acc, item) => acc + item.total, 0);

    postApiBack("/orders/add", {
      mail,
      products,
      total: totalCommand,
    })
      .then((response) => {
        console.log("reponse de l'API :" + response);
        // on ajoute les produits dans la base de données
        // on post les produits dans la base de données
        postApiBack("/productOrders/add", {
          response,
          products,
        })
          .then((response) => {
            console.log("reponse de l'API :" + response);
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération des données :",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  };

  return (
    <div>
      <div id="cart-list">
        <h2>Panier</h2>

        {cartSize === 1 && <span>{cartSize} Article</span>}
        {cartSize > 1 && <span>{cartSize} Articles</span>}

        {cartSize === 0 && <EmptyCart />}

        <div className="cart-item cart-header">
          <div></div>
          <div>
            <b>Article</b>
          </div>
          <div>
            <b>Prix</b>
          </div>
          <div>
            <b>Total</b>
          </div>
          <div>
            <b>Quantité</b>
          </div>
        </div>

        {productsInCart.map((product) => (
          <CartList key={product.product.productId} {...product} />
        ))}
        <h3>Total: {formatCurrency(cartTotal)}</h3>
      </div>
      <input onChange={handleMail} type="text" placeholder="votre mail" />
      <button onClick={handleOrder}>commander</button>
    </div>
  );
};
export default Cart;
